import styles from "../SalesTable/style.module.css";
import classnames from 'classnames'
import {useState} from "react";
import axios from "axios";
import helpers from "../../../helpers";
import AddLayerBody from "../../ModalBodies/AddItemToDatabaseBody/AddLayerBody";
import ModalWindow from "../../../../src/components/ModalWindow";

export default function MattressLayersTable(props){
    const [newLayerTitle, setNewLayerTitle] = useState('');
    const [newLayerThickness, setNewLayerThickness] = useState(0);
    const [newLayerDescription, setNewLayerDescription] = useState('');
    const [newLayerPrice, setNewLayerPrice] = useState(0);
    const [newLayerImgSrc, setNewLayerImgSrc] = useState('');
    // const [showModal, setShowModal] = useState(false)
    // const [modalBody, setModalBody] = useState(<AddLayerBody setShowModal={setShowModal}/>)
    // const [modalTitle, setModalTitle] = useState('Добавить слой')

    const createLayer = () => {
        let data = {
            title: newLayerTitle,
            description: newLayerDescription,
            thickness: newLayerThickness,
            price: +newLayerPrice,
            imgSrc: newLayerImgSrc
        };

        axios.post(helpers.serverDomain + '/mattresses/layers', data)
            .then(function (response) {
                alert('Слой добавлен успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    const deleteLayer = (id) => {
        axios.delete(helpers.serverDomain + '/mattresses/layers/' + id)
            .then(function (response) {
                alert('Слой удален успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    return(
        <>
            {/* <ModalWindow body={modalBody} setShowModal={setShowModal} title={modalTitle}/> */}
            <div className={styles.admin_block}>
                
                <div className={styles.widgets}>
                    <h2>Слои</h2>
                    <div className={styles.add_button} title="Добавить" 
                        onClick={() => {
                            // props.setModalBody(<AddLayerBody/>);                            
                            props.setShowModal();               
                        }}
                    ></div>
                </div>

                <div className={styles.table_wrapper}>
                    <table className={styles.fl_table}>
                        <thead>
                            <tr>
                            <th>Наименование</th>
                            <th>Толщина</th>
                            <th>Описание</th>
                            <th>Цена</th>
                            <th>Изображение</th>
                            <th></th>    
                            </tr>
                        </thead>
                        <tbody>
                            {props.layers.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>Нет данных</td>
                                </tr>
                                ) : (                            
                                    props.layers.map(item => (
                                        <tr key={item.id} className={styles.table_row}>
                                            <td className={styles.table_cell}>{item.title}</td>
                                            <td className={classnames(styles.table_cell, styles.thickness)}>{item.thickness}</td>
                                            <td className={classnames(styles.table_cell)}>{item.description}</td>
                                            <td className={styles.table_cell}>{item.price}</td>
                                            <td className={styles.table_cell}><a href={item.imgSrc} target="_blank" width={'100%'}>Посмотреть</a></td>
                                            <td className={styles.table_cell}><div onClick={() => deleteLayer(item._id)} className={styles.delete_btn2}></div></td>
                                        </tr>
                                    ))
                             )}
                            
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}
