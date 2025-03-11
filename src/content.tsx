import cssText from "data-text:~index.css"
import { css } from "styled-system/css"

import ToolbarDemo from "~features/tool-bar"

// export const config: PlasmoCSConfig = {
//   matches: ["<all_urls>"]
// }

/**
 * Generates a style element with adjusted CSS to work correctly within a Shadow DOM.
 *
 * Tailwind CSS relies on `rem` units, which are based on the root font size (typically defined on the <html>
 * or <body> element). However, in a Shadow DOM (as used by Plasmo), there is no native root element, so the
 * rem values would reference the actual page's root font size—often leading to sizing inconsistencies.
 *
 * To address this, we:
 * 1. Replace the `:root` selector with `:host(plasmo-csui)` to properly scope the styles within the Shadow DOM.
 * 2. Convert all `rem` units to pixel values using a fixed base font size, ensuring consistent styling
 *    regardless of the host page's font size.
 */
export const getStyle = (): HTMLStyleElement => {
  const baseFontSize = 16

  let updatedCssText = cssText.replaceAll(":root", ":host(plasmo-csui)")
  const remRegex = /([\d.]+)rem/g
  updatedCssText = updatedCssText.replace(remRegex, (match, remValue) => {
    const pixelsValue = parseFloat(remValue) * baseFontSize

    return `${pixelsValue}px`
  })

  const styleElement = document.createElement("style")

  styleElement.textContent = updatedCssText

  return styleElement
}

const PlasmoOverlay = () => {
  return (
    <div>
      <div className=" plasmo-h-[90vh] plasmo-block plasmo-fixed plasmo-top-10 plasmo-right-10 plasmo-p-6 plasmo-w-auto plasmo-bg-white plasmo-rounded-lg plasmo-border plasmo-border-gray-200 plasmo-shadow-md plasmo-dark:bg-gray-800 plasmo-dark:border-gray-700 plasmo-dark:hover:bg-gray-700">
        <h1 className="plasmo-mb-2 plasmo-text-3xl plasmo-font-bold plasmo-tracking-tight plasmo-text-gray-900 plasmo-dark:text-white">
          Wikipedia TLDR
        </h1>

        <p className="plasmo-font-normal plasmo-text-gray-700 plasmo-dark:text-gray-400">
          A plasmo hacked extension
        </p>
        <p className={css({ bg: "red.500", h: "2rem", w: "2rem", color: 'blue.200', fontSize: '3xl' })}>
          A plasmo hacked extension
        </p>
        <ToolbarDemo />

        <div >click</div>
      </div>
    </div>
  )
}

export default PlasmoOverlay
