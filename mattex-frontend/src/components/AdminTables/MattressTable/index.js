import styles from "../SalesTable/style.module.css";
import classnames from 'classnames'
import {useState} from "react";
import axios from "axios";
import helpers from "../../../helpers";

export default function MattressTable(props){    
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
                            <th></th>    
                            </tr>
                        </thead>
                        <tbody>
                            {props.matresses.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>Нет данных</td>
                                </tr>
                                ) : (                            
                                    props.matresses.map(item => (
                                        <tr key={item.id} className={styles.table_row}>
                                            <td>{item.name}</td>
                                            <td>{item.cloth}</td>
                                            <td>{item.height}</td>
                                            <td>{item.load}</td>
                                            <td>{item.price}</td>                                            
                                            <td><a href={item.imgSrc} target="_blank" width={'100%'}>Посмотреть</a></td>
                                            <td className={styles.table_cell}><div onClick={() => deleteCase(item._id)} className={styles.delete_btn2}></div></td>
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
