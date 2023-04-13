import styles from "../SalesTable/style.module.css";
import classnames from 'classnames'
import {useState} from "react";
import axios from "axios";
import helpers from "../../../helpers";

export default function MattressBasesTable(props){
    const [newBaseTitle, setNewBaseTitle] = useState('');
    const [newBaseDescription, setNewBaseDescription] = useState('');
    const [newBasePrice, setNewBasePrice] = useState(0);
    const [newBaseImgSrc, setNewBaseImgSrc] = useState('');

    const createBase = () => {
        let data = {
            title: newBaseTitle,
            description: newBaseDescription,
            price: +newBasePrice,
            imgSrc: newBaseImgSrc
        };

        axios.post(helpers.serverDomain + '/mattresses/bases', data)
            .then(function (response) {
                alert('Основа добавлен успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    const deleteBase = (id) => {
        axios.delete(helpers.serverDomain + '/mattresses/bases/' + id)
            .then(function (response) {
                alert('Основа удален успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    return(
        <>
            <div className={styles.admin_block}>
                <div className={styles.widgets}>
                    <h2>Основы</h2>
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
                            <th>Описание</th>
                            <th>Цена</th>
                            <th>Изображение</th>
                            <th></th>    
                            </tr>
                        </thead>
                        <tbody>
                            {props.bases.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>Нет данных</td>
                                </tr>
                                ) : (                            
                                    props.bases.map(item => (
                                        <tr key={item.id} className={styles.table_row}>
                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            <td><a href={item.imgSrc} target="_blank" width={'100%'}>Посмотреть</a></td>
                                            <td className={styles.table_cell}><div onClick={() => deleteBase(item._id)} className={styles.delete_btn2}></div></td>
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
