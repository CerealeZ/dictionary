import { useState, useEffect } from "react"

interface DeviceInfo {
  breakpoint: number
}

export default function useDevice() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>()

  useEffect(function getWindow() {
    const handleSize = () => {
      const actualBreakpoint = getBreakpoint(window.innerWidth)
      setBreakpoint(actualBreakpoint)
    }
    handleSize()
    window.addEventListener("resize", handleSize)
    return () => {
      window.removeEventListener("resize", handleSize)
    }
  }, [])

  return {
    breakpoint,
  }
}

export type Breakpoint = {
  size: "XS" | "SM" | "MD" | "LG" | "XL"
  breakpoint: number
}

export const breakpoints: Breakpoint[] = [
  { size: "XS", breakpoint: 0 },
  { size: "SM", breakpoint: 576 },
  { size: "MD", breakpoint: 768 },
  { size: "LG", breakpoint: 992 },
  { size: "XL", breakpoint: 1200 },
]

const getBreakpoint = (width: number): Breakpoint => {
  const foundBreakpoint =
    breakpoints.findLast(({ breakpoint }) => {
      return width >= breakpoint
    }) ?? breakpoints.at(0)
  return foundBreakpoint as Breakpoint
}

/* 
Los breakpoints son puntos específicos de ancho de pantalla en los que se cambia el diseño de un sitio web o aplicación para adaptarse a
diferentes tamaños de pantalla. Aquí te muestro algunos de los breakpoints más utilizados en la actualidad:

320px - Este es el ancho de pantalla mínimo común para teléfonos móviles.
480px - Este es otro punto común para teléfonos móviles de mayor tamaño y algunos dispositivos más pequeños como las tabletas.
768px - Este es el punto de quiebre común para diseños de tabletas y se utiliza comúnmente para cambiar de una vista de columna única a una vista de dos columnas.
992px - Este es un punto de quiebre común para diseños de escritorio de tamaño mediano.
1200px - Este es un punto de quiebre común para diseños de escritorio de pantalla grande y se utiliza comúnmente para cambiar a diseños de tres columnas.
Cabe destacar que estos breakpoints son solo una guía general y pueden variar dependiendo del diseño específico de un sitio web
o aplicación. Además, con la creciente popularidad de
los dispositivos móviles y las pantallas de alta resolución, muchos diseñadores están optando por 
enfoques más flexibles para el diseño responsivo, como el uso de unidades de medida relativas como el porcentaje 
y la em en lugar de puntos de quiebre fijos.
*/
