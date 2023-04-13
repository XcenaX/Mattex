import styles from "../SalesTable/style.module.css";
import classnames from 'classnames'
import React, {useState} from "react";
import axios from "axios";
import helpers from "../../../helpers";
import ModalWindow from "../../ModalWindow";
import OrderInfo from "./OrderInfo";

export default function OrdersTable(props){
    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('Default body')
    const [modalTitle, setModalTitle] = useState('Информация и заказе')

    const deleteOrder = (id) => {
        var current_order = document.getElementById("order"+id);
        current_order.delete();
        axios.delete(helpers.serverDomain + '/orders/' + id)
            .then(function (response) {
                alert('Заказ удален успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    return(
        <>
            <div className={styles.admin_block}>                
                <div className={styles.widgets}>
                    <h2>Заявки</h2>                    
                </div>
                <div style={{display: showModal ? 'block' : 'none'}}>
                    <ModalWindow body={modalBody} setShowModal={setShowModal} title={modalTitle}/>
                </div>

                <div className={styles.table_wrapper}>
                    <table className={styles.fl_table}>
                        <thead>
                            <tr>
                            <th>ФИО</th>
                            <th>Телефон</th>
                            <th>Дата</th>
                            <th>Сумма</th>
                            <th></th>    
                            </tr>
                        </thead>
                        <tbody>
                            {props.orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>Нет данных</td>
                                </tr>
                                ) : (                            
                                props.orders.map(item => (
                                    <tr key={item.id} className={styles.table_row} id={"order"+item._id}>
                                        <td>{item.user !== null ? item.user.fullName : 'Неизвестно'}</td>
                                        <td>{item.user !== null ? item.user.phone : 'Неизвестно'}</td>
                                        <td>{helpers.dateTimeFormatter(new Date(item.date))}</td>
                                        <td>{item.totalSum}</td>
                                        <td className={styles.td_actions}>
                                            <div onClick={() => deleteOrder(item._id)} className={styles.delete_btn2}></div>
                                            <button
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setModalBody(<OrderInfo order={item}/>)
                                                }}
                                                className={styles.show_btn}
                                            >
                                                См. заказ
                                            </button>
                                        </td>
                                                                                
                                    </tr>
                                ))
                             )}
                            
                        </tbody>
                    </table>
                </div>

                {/* <table className={styles.table} cellPadding={10}>
                    <thead className={styles.head_row}>
                    <tr>
                        <th className={styles.table_cell}>ФИО</th>
                        <th className={styles.table_cell}>Телефон</th>
                        <th className={styles.table_cell}>Дата</th>
                        <th className={styles.table_cell}>Сумма</th>
                        <th className={styles.table_cell}></th>                        
                    </tr>
                    </thead>
                    <tbody style={{width: '100%'}}>
                    {props.orders.map(item => (
                        <tr key={item.id} className={styles.table_row}>
                            <td className={styles.table_cell}>{item.user !== null ? item.user.fullName : 'Неизвестно'}</td>
                            <td className={styles.table_cell}>{item.user !== null ? item.user.phone : 'Неизвестно'}</td>
                            <td className={styles.table_cell}>{helpers.dateTimeFormatter(new Date(item.date))}</td>
                            <td className={styles.table_cell}>{item.totalSum}</td>
                            {props.admin && (<td className={styles.table_cell}>
                                <button
                                    onClick={() => deleteOrder(item._id)}
                                    className={styles.delete_btn}
                                >Удалить</button>
                            </td>)}
                            {props.admin && (<td className={styles.table_cell}>
                                <button
                                    onClick={() => {
                                        setShowModal(true);
                                        setModalBody(<OrderInfo order={item}/>)
                                    }}
                                    className={styles.show_btn}
                                >
                                См. заказ
                            </button></td>)}
                        </tr>
                    ))}
                    </tbody>
                </table> */}
                <br/>
            </div>
        </>
    );
}
