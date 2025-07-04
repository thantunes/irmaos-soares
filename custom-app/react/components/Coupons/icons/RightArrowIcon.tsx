import React from 'react'

const RightArrowIcon = () => {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_4_84)">
        <rect
          x="10.5"
          y="10"
          width="32"
          height="32"
          rx="16"
          fill="black"
          shape-rendering="crispEdges"
        />
        <path
          d="M21.2732 29.7732L28.5515 26L21.2732 22.2268V20L31.7268 25.4433V26.5361L21.2732 32V29.7732Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_4_84"
          x="0.5"
          y="0"
          width="52"
          height="52"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4_84"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4_84"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default RightArrowIcon
