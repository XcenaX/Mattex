import styles from "../SalesTable/style.module.css";
import classnames from 'classnames'
import {useState} from "react";
import axios from "axios";
import helpers from "../../../helpers";

export default function MattressCasesTable(props){
    const [newCaseTitle, setNewCaseTitle] = useState('');
    const [newCaseDescription, setNewCaseDescription] = useState('');
    const [newCasePrice, setNewCasePrice] = useState(0);
    const [newCaseImgSrc, setNewCaseImgSrc] = useState('');

    const createCase = () => {
        let data = {
            title: newCaseTitle,
            description: newCaseDescription,
            price: +newCasePrice,
            imgSrc: newCaseImgSrc
        };

        axios.post(helpers.serverDomain + '/mattresses/cases', data)
            .then(function (response) {
                alert('Чехол добавлен успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    const deleteCase = (id) => {
        axios.delete(helpers.serverDomain + '/mattresses/cases/' + id)
            .then(function (response) {
                alert('Чехол удален успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    return(
        <>
            <div className={styles.admin_block}>
                <div className={styles.widgets}>
                    <h2>Чехлы</h2>
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
                            {props.cases.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>Нет данных</td>
                                </tr>
                                ) : (                            
                                    props.cases.map(item => (
                                        <tr key={item.id} className={styles.table_row}>
                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
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
