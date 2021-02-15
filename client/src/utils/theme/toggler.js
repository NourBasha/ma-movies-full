import React from 'react'
import { func, string } from 'prop-types';
// import styled from "styled-components"
import DarkModeToggle from "react-dark-mode-toggle";



// const A = styled.a`

//   color: ${({ theme }) => theme.text};
//   cursor: pointer;
//   text-decoration:none;
// //   font-size:0.8rem  ;
// //   padding: 0.6rem;
//     // position: absolute;
//     // bottom:10px;
//     // right:10px;
//     // z-index:3;
//   }
// `;

const Toggle = ({theme,  toggleTheme, collapseLinks }) => {

   
    return (
           // <ToggleButton isDark={theme ==='dark'?true:false} onChange={() => toggleTheme() } />
            <DarkModeToggle onChange={()=>{toggleTheme()}} checked={theme ==='dark'?true:false}
                            size={80}
                            />
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;