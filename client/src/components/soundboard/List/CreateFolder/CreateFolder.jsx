import React, { useContext, useEffect, useState } from "react";
import { ListContext } from "../../../../context/ListContext";
import './CreateFolder.css'

const CreateFolder = () => {

    const {folderData, setFolderData, folderCreate, setFolderCreate} = useContext(ListContext)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        function keyUp(e){
            if(e?.key === 'Enter'){
                setFolderData((oldData) => [...oldData, {id: 'default', name: inputValue, activ: false, rename: false}])
                setFolderCreate(false)
            }
        }
        document.addEventListener('keyup', keyUp)
        return () => document.removeEventListener('keyup', keyUp)

    }, [folderData, inputValue, setFolderCreate, setFolderData])

  return  (
    <div className="folder-create">
        <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#f3f3f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
        <input type="text" 
        autoFocus={true} 
        onBlur={() => setFolderCreate(false)}
        onChange={(e) => setInputValue(e.target.value)}
        />
    </div>)
};

export default CreateFolder;
