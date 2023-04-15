import styles from "../SalesTable/style.module.css";
import classnames from 'classnames'
import {useState} from "react";
import axios from "axios";
import helpers from "../../../helpers";

export default function MattressTable(props){    
    const deleteMattress = (id) => {
        axios.delete(helpers.serverDomain + '/mattresses/catalogMattresses/' + id)
            .then(function (response) {
                alert('Матрас удален успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло не так!');
            });
    }
    return(
        <>
            <div className={styles.admin_block}>
                <div className={styles.widgets}>
                    <h2>Матрасы</h2>
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
                            <th>Название</th>
                            <th>Ткань</th>
                            <th>Высота(см)</th>
                            <th>Жесткость</th>
                            <th>Цена(KZT)</th>                            
                            <th>Изображение</th>
                            <th></th>                            
                            </tr>
                        </thead>
                        <tbody>
                            {props.mattresses.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>Нет данных</td>
                                </tr>
                                ) : (                            
                                    props.mattresses.map(item => (
                                        <tr key={item.id} className={styles.table_row}>
                                            <td>{item.name}</td>
                                            <td>{item.cloth}</td>
                                            <td>{item.height}</td>
                                            <td>{item.load}</td>
                                            <td>{item.price}</td>                                            
                                            <td><a href={"https://mattex.onrender.com/api/uploads/"+item.image} target="_blank" width={'100%'}>Посмотреть</a></td>
                                            <td className={styles.table_cell}><div onClick={() => deleteMattress(item._id)} className={styles.delete_btn2}></div></td>
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
