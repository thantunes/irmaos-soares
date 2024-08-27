import React, { useEffect, useState } from "react";
import styles from "./styles.css";
//@ts-ignore
import { Modal, Button, Input, InputButton } from 'vtex.styleguide'
import InputMask from "react-input-mask";
import { useUpdateSession } from 'vtex.session-client'
import Cookies from 'js-cookie';

function Geolocalizacao() {
    // const { loading, data } = useFullSession()
    const updateSession = useUpdateSession()
    const cepDefault = "74573260";
    const [cep, setCep] = useState("");
    const [location, setLocation] = useState('');
    const [isModalOpen, setisModalOpen] = useState<boolean>(false)
    const [errorIS, setErrorIS] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleModalToggle = () => {
        setisModalOpen(!isModalOpen)
    }



    const getLocation = async (cep: string) => {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
        })
        const data = await response.json();
        return data;
    }


    // Função para obter a política comercial com base no CEP
    async function getPolicyForPostalCode(postalCode: string) {
        const where = `(((CepInicial<${postalCode}) AND (CepFinal>${postalCode})) OR (CepInicial=${postalCode}) OR  (CepFinal=${postalCode}))`;
        const response = await fetch(`/api/dataentities/CP/search?_fields=CepFinal,IdPoliticaComercial,CepInicial,NomePoliticaComercial&_where=${where}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
        }).then((response) => response.json());
        console.log({response, postalCode})
        return response[0].IdPoliticaComercial || null;
    }

    // Função para configurar o cookie VTEXSC com base na política comercial
    function setVtexScCookie(policy: any) {
        const scValue = policy ? `sc=${policy}` : 'sc=1';
        Cookies.set('VTEXSC', scValue);
    }

    // Função para redirecionar a página com o parâmetro sc
    // function redirectToScParameter(scValue: string) {
    //     window.location.href = `?${scValue}`;
    // }

    // Função para tratar a alteração do CEP
    async function handleCepChange(cep: string) {
        try {
            const policy = await getPolicyForPostalCode(cep).then((policy) => policy).catch((error) => console.error(error));
            if (!policy) return;

            // Limpar o carrinho quando houver uma alteração no CEP
            await fetch('/api/checkout/pub/orderForm?forceNewCart=true', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
            }).then(async (response) => {
                if (response) {
                    console.info('Carrinho limpo com sucesso.');
                    setVtexScCookie(policy);
                    console.info('Cookie VTEXSC configurado com sucesso.');

                    await updateSession({
                        variables: {
                            fields: {
                                sc: policy ? policy : 1,
                                postalCode: cep,
                                countryCode: 'BRA'
                            }
                        }
                    })
                    console.info('Sessão atualizada com sucesso.', {response});

                } else {
                    console.error('Falha ao limpar o carrinho.');
                }
            }).catch((error) => console.error(error));
            // redirectToScParameter(policy ? `sc=${policy.IdPoliticaComercial}` : 'sc=1');
        } catch (error) {
            console.error("Erro ao obter a política comercial:", error);
        }
    }


    const isCepValid = () => {
        const regex = /^([\d]{2})\.?([\d]{3})-?([\d]{3})/
        return regex.test(cep)
    }

    const confirmLocation = async () => {
        setIsLoading(true);
        setErrorIS('');

        if (!cep) {
            setErrorIS('Informe o CEP');
            setIsLoading(false);
            return;
        }

        if (!isCepValid()) {
            setErrorIS('CEP inválido');
            setIsLoading(false);
            return;
        }

        try {
            const response = await getLocation(cep);

            if (response?.erro) {
                setErrorIS('CEP inválido');
                setIsLoading(false);
                return;
            }

            const cepFormatted = cep.replace('-', '');
            Cookies.set('userLocation', response.localidade);  // Salvar o nome da cidade no cookie
            Cookies.set('userPostalCode', cep); // Salvar o CEP no cookie
            handleCepChange(cepFormatted);
            handleModalToggle();
            setIsLoading(false);
            window.location.reload()
        } catch (error) {
            setIsLoading(false);
            console.log("error: ", error);
        }
    }

    // async function postalCode() {
    //     const response = await fetch('/api/sessions?items=public.postalCode', {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
    //     })
    //     const data = await response.json();
    //     return data;
    // }

    useEffect(() => {
        // Verifique se o nome da cidade já está no cookie
        const savedLocation = Cookies.get('userLocation');

        if (savedLocation) {
            // Se o nome da cidade estiver no cookie, use-o
            setLocation(savedLocation);
        } else {

            var validacep = /^[0-9]{8}$/;
            const cep = Cookies.get('userPostalCode') || '';

            if (!cep) {
                handleModalToggle();
            }

            if (cep && validacep.test(cep)) {
                getLocation(cep).then((data) => {
                    if (data?.erro) {
                        setErrorIS('CEP inválido');
                        return;
                    }
                    // Após obter o nome da cidade, salve-o em um cookie
                    Cookies.set('userLocation', data.localidade);
                    setLocation(data.localidade);
                });
            }

        }
    }, []);


    return (
        <div
            className={styles.locationInfo}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="15.413" height="22.17" viewBox="0 0 15.413 22.17"><path d="M1.456,0A7.715,7.715,0,0,0-6.25,7.706c0,5.341,7.714,14.464,7.714,14.464s7.7-9.386,7.7-14.464A7.715,7.715,0,0,0,1.456,0ZM3.781,9.963a3.288,3.288,0,0,1-4.65-4.65,3.266,3.266,0,0,1,2.325-.963A3.288,3.288,0,0,1,3.781,9.963Zm0,0" transform="translate(6.25)" fill="#0d6721"></path></svg>
            <a
                href="#"
                role="button"
                title="Localização"
                className={styles.locationInfoText}
                onClick={handleModalToggle}
            >
                {location ? location : 'Informar CEP'}
            </a>

            <Modal
                isOpen={isModalOpen}
                title="Olá, onde você está?"
                aria-describedby="modal-description"
                size="small"
                closeOnOverlayClick={false}
                bottomBar={
                    <div className="nowrap">
                        <span>
                            <Button
                                variation="primary"
                                onClick={
                                    () => {
                                        confirmLocation()
                                    }
                                }>
                                {
                                    isLoading ? 'Carregando...' : 'Confirmar'
                                }
                            </Button>
                        </span>
                    </div>
                }
                onClose={
                    async () => {
                        // Caso o usuário feche o modal, preencher com o CEP default da loja
                        if (!cep) {
                            setIsLoading(true);

                            try {
                                const response = await getLocation(cepDefault);
                                const cepFormatted = cepDefault.replace('-', '');
                                Cookies.set('userLocation', response.localidade);
                                handleCepChange(cepFormatted);
                                setIsLoading(false);
                                handleModalToggle();
                            } catch (error) {
                                console.error("error: ", error);
                            }
                        }
                    }
                }>
                <div className="flex flex-column flex-row-ns">
                    <div className="w-100 w-100-ns flex justify-start ">
                        <div className="w-100 mb4">
                            <p className="mb3" id="modal-description">Diferentes opções de entrega e ofertas para sua cidade.</p>
                            <InputMask
                                mask="99999-999"
                                value={cep}
                                onChange={(ev) => setCep(ev.target.value || '')}
                                maskPlaceholder={''}
                            >
                                <Input
                                    id="cep-input"
                                    isLoading={isLoading}
                                    autoFocus
                                    autoComplete="on"
                                    placeholder="#####-###"
                                    errorMessage={errorIS}
                                    helpText={"Ao informar, você concorda com a nossa Política de Privacidade."}
                                    value={cep}
                                />
                            </InputMask>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Não sei meu CEP"
                                href="https://buscacepinter.correios.com.br/"
                                className="modal-localizacao__link c-link mv3">Não sei meu CEP</a>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Geolocalizacao;
