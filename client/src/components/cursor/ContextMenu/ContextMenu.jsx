import React, { useState } from "react";

const useContextMenu = (target) => {

  const [rightClickOptions, setRightClickOptions] = React.useState({
      x: '',
      y: '',
      showMenu: false
    })
    
    const onRightClick = (event) => {
        event.preventDefault()
        if(event.target === document.querySelector(target)){
          setRightClickOptions({
            x:event.pageX + "px",
            y:event.pageY + "px",
            showMenu: true
          })
        }
    }

    const onLeftClick = () => {
      setRightClickOptions((prevState) => ({...prevState, showMenu: false}))
    }

    React.useEffect(() => {
      const targetElement = document.querySelector(target)
      document.addEventListener('click', onLeftClick)
      targetElement?.addEventListener('contextmenu', onRightClick)
      return () =>{ 
        document.removeEventListener('click', onLeftClick)
        targetElement?.removeEventListener("contextmenu", onRightClick)
      }
    })

    return rightClickOptions;
}

export {useContextMenu};
