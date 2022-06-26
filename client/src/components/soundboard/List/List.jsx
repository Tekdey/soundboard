import React, {useEffect, useState} from "react";
import Folder from "./Folder/Folder";
import ListHeader from "./ListHeader/ListHeader";
import "./List.css"
import CreateFolder from "./CreateFolder/CreateFolder";
import { useContext } from "react";
import { ListContext } from "../../../context/ListContext";

const List = () => {


  const { folderData,folderCreate} = useContext(ListContext)
  const [forceUpdate, setForceUpdate] = useState(true)


  /* It's a hack to force a re-render of the component. */
  useEffect(() => {
    setForceUpdate(false)
    setTimeout(() => setForceUpdate(true), 0)
  }, [folderData])

    
  return (
    <>
      <div className="list__container">
        <ListHeader />
          <div className="folder__container" id="folder-options">
              {forceUpdate && folderData.map((folderId, index) => {
                if(folderId){
                  return <Folder key={index} id={index} data={folderId} />
                }
              })}
            {folderCreate && <CreateFolder/>}
          </div>
      </div>
    </>
  )
};

export default List;
