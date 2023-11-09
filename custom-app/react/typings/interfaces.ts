interface IShop {
    id: string;
    image: string;
    name: string;
    region: string;
    city: string;
    state: string;
    address: string;
    route: string;
}
interface IState {
    state: string;
}

interface ICity {
    state: string;
}


interface Tinstallment {
    InterestRate: number;
    Name: string;
    NumberOfInstallments: number;
    PaymentSystemName: string;
    TotalValuePlusInterestRate: number;
    Value: number;
    __typename: string;
}

type installmentGroup = [string, Tinstallment[]];
