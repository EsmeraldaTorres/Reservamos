import React from "react";
import reservamosLogo from "../../../Assets/images/reservamos-logo.png"
import "./Header.styles.css"
const Header = ()=>{
    return(
        <>
    <header className="h-16 bg-white flex justify-between items-center">
      <img src={reservamosLogo} alt="logo" className="w-40" />
      <p className="mr-10 text-white block tablet:hidden">Menu</p>
    </header>
        </>
    )
}

export default Header