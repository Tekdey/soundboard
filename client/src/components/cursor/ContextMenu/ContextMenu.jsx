import React from "react";
import { ListContext } from "../../../context/ListContext";

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

const CustomContextMenu = ({x,y,showMenu}) => {

  const {setMenuOptions} = React.useContext(ListContext)

  return showMenu && (
    <div className="menu-perso" onContextMenu={(e) => e.preventDefault()} style={{
      top: y,
      left: x,
    }}>
      <button className="btn b1" onClick={() => setMenuOptions((_) => ({..._, rename: true }))}>Rename</button>
      <button className="btn b2" onClick={() => setMenuOptions((_) => ({..._, delete: true }))}>Delete</button>
    </div>
  )
}

export {useContextMenu, CustomContextMenu};
