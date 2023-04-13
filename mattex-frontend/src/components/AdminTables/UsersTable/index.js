import styles from "../SalesTable/style.module.css";
import axios from "axios";
import helpers from "../../../helpers";
import {useState} from "react";
import classnames from 'classnames'

export default function UsersTable(props){
    const deleteUsers = (id) => {
        axios.delete(helpers.serverDomain + '/users/' + id)
            .then(function (response) {
                alert('Пользователь удален успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    return(
        <>
            <div className={styles.admin_block}>
                <div className={styles.widgets}>
                    <h2>Пользователи</h2>                    
                </div>

                <div className={styles.table_wrapper}>
                    <table className={styles.fl_table}>
                        <thead>
                            <tr>
                            <th>ФИО</th>
                            <th>Телефон</th>
                            <th>Логин</th>
                            <th>Пароль</th>
                            <th>Коофицент</th>
                            <th></th>    
                            </tr>
                        </thead>
                        <tbody>
                            {props.users.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>Нет данных</td>
                                </tr>
                                ) : (                            
                                    props.users.map(item => {
                                        const [coefficient, setCoefficient] = useState(item.coefficient);
                
                                        const updateUser = (id) => {
                                            axios.put(helpers.serverDomain + '/users', {id, coefficient})
                                                .then(function (response) {
                                                    alert('Пользователь обновлен успешно!');
                                                })
                                                .catch(function (error) {
                                                    alert('Что-то пошло нетак!');
                                                });
                                        }
                
                                        return(
                                            <tr key={item.id} className={styles.table_row}>
                                                <td>{item.fullName}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.login}</td>
                                                <td>{item.password}</td>
                                                <td><input type="number" onChange={e => setCoefficient(e.target.value)} value={coefficient}/></td>
                                                <td className={classnames(styles.td_actions)}>
                                                    <div onClick={() => deleteUsers(item._id)} className={styles.delete_btn2}></div>
                                                    <div onClick={() => updateUser(item._id)} className={styles.show_btn2}></div>                                                
                                                </td>
                                                
                                            </tr>
                                        )
                                    })
                             )}
                            
                        </tbody>
                    </table>
                </div>

                
                
            </div>
        </>
    );
}
