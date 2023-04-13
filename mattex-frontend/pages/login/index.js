import styles from './style.module.css';
import React, {useEffect, useState} from "react";
import Header from "../../src/components/Header/Header";
import axios from "axios";
import helpers from "../../src/helpers";
import {useRouter} from "next/router";
import modalStyles from "../../src/components/ModalWindow/ModalWindow.module.css";
import ModalWindow from "../../src/components/ModalWindow";
import {CSSTransition} from "react-transition-group";
import ConstructorBody from "../../src/components/ModalBodies/ConstructorBody";
import Head from "next/head";

export default function Login(){
    const router = useRouter();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [isRegistration, setIsRegistration] = useState(false);

    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('Default body')
    const [modalTitle, setModalTitle] = useState('')

    const [messageForUser, setMessageForUser] = useState('');

   

    const loginButtonPressed = () => {
        axios.post(helpers.serverDomain + '/users/login', {
            login,
            password
        })
            .then(function (response) {
                if(response.data !== false){
                    localStorage.setItem(helpers.localStorageKeys.user, JSON.stringify(response.data));
                    if(response.data.role === 1){
                        router.push('/admin');
                    }else if(response.data.role === 2){
                        router.push('/');
                    }

                }else{
                    setMessageForUser('Неверные данные для входа!');
                }
            })
            .catch(function (error) {
                alert("Что-то пошло нетак!");
            });
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            alert("ok");
        }
    };

    const registrationButtonPressed = () => {
        axios.post(helpers.serverDomain + '/users', {
            login,
            password,
            fullName,
            phone,
            coefficient: 1,
            role: 2
        })
            .then(function (response) {
                localStorage.setItem(helpers.localStorageKeys.user, JSON.stringify(response.data));
                router.push('/');
            })
            .catch(function (error) {
                alert("Что-то пошло нетак!");
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        localStorage.removeItem(helpers.localStorageKeys.user);
    }, []);

    return(
        <div className={styles.container}>
            <Head>
                <title>Mattex - Авторизация</title>
                <link rel="icon" href="/" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
            </Head>

            {/* <Header openConstructorModal={openConstructorModal}/> */}

            <CSSTransition in={showModal} timeout={200} unmountOnExit classNames={{
                enter: modalStyles.alertEnter,
                enterActive: modalStyles.alertEnterActive,
                exit: modalStyles.alertExit,
                exitActive: modalStyles.alertExitActive,
            }}>
                <ModalWindow body={modalBody} setShowModal={setShowModal} title={modalTitle}/>
            </CSSTransition>

            {/* <div className={styles.login_block}>
                <p className={styles.title}>{isRegistration ? 'Регистрация ВЛЯД' : 'Вход Влад'}</p>

                <p className={styles.message}>{messageForUser}</p>

                <form onSubmit={handleSubmit} style={{textAlign: 'center'}}>
                    <input type="text" className={styles.input} onChange={e => setLogin(e.target.value)} placeholder={'Логин'}/>
                    <input type="password" className={styles.input} onChange={e => setPassword(e.target.value)} placeholder={'Пароль'}/>
                    <br/>
                    {
                        isRegistration ? (
                            <>
                                <input type="text" className={styles.input} onChange={e => setFullName(e.target.value)} placeholder={'ФИО'}/>
                                <input type="text" className={styles.input} onChange={e => setPhone(e.target.value)} placeholder={'Телефон'}/>
                            </>
                        ) : null
                    }

                    <button
                        className={styles.button}
                        onClick={() => {
                            if(isRegistration){
                                registrationButtonPressed();
                            }else{
                                loginButtonPressed();
                            }
                        }}
                        type={'submit'}
                    >
                        {isRegistration ? 'Зарегистрироваться Вляд' : 'Войти'}
                    </button>
                </form>
                <p
                    className={styles.registration_link}
                    onClick={() => setIsRegistration(!isRegistration)}
                >
                    {isRegistration ? 'Войти' : 'Зарегистрироваться'}
                </p>
            </div> */}

                
                <div className={styles.row + " " + styles.align_items_center + " " + styles.justify_content_center}>
                    <div className={styles.col_md_6}>
                        
                        <div className={styles.form_block}>
                            <div className={styles.mb_3  + " " + styles.align_items_center}>                                
                                <span className={"ml-auto"} onClick={() => setIsRegistration(!isRegistration)}>
                                    <a href='/' className={styles.to_main}>
                                        {"❮ Назад"}
                                    </a>
                                </span>
                            </div>

                            <div className={styles.text_center + " " + styles.mb_5}>
                                <h3><strong>{isRegistration ? 'Регистрация' : 'Вход'}</strong></h3>
                                
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.form_group + " " + styles.first}>
                                    <label htmlFor="username">Логин</label>
                                    <input className={styles.form_control} onChange={e => setLogin(e.target.value)} placeholder={'Введите ваш логин'} id='username' />
                                </div>
                                <div className={styles.form_group + " " + styles.last + " " + styles.mb_3}>
                                    <label htmlFor="password">Пароль</label>
                                    <input type="password" className={styles.form_control} onChange={e => setPassword(e.target.value)} placeholder={'Введите ваш пароль'} id='password' />
                                </div>

                                {
                                    isRegistration ? (
                                        <>
                                            <div className={styles.form_group + " " + styles.last + " " + styles.mb_3}>
                                                <label htmlFor="fullname">ФИО</label>
                                                <input type="text" className={styles.form_control} onChange={e => setFullName(e.target.value)} placeholder={'Введите ваше ФИО'} id='fullname' />
                                            </div>
                                            <div className={styles.form_group + " " + styles.last + " " + styles.mb_3}>
                                                <label htmlFor="phone">Телефон</label>
                                                <input type="text" className={styles.form_control} onChange={e => setPhone(e.target.value)} placeholder={'Введите ваш телефон'} id='phoner' />
                                            </div>                                        
                                        </>
                                    ) : null
                                }

                                <div className={styles.t_a_r + " " + styles.mb_5  + " " + styles.align_items_center}>
                                    
                                    <span className={"ml-auto"} onClick={() => setIsRegistration(!isRegistration)}>
                                        <a className={"forgot-pass"}>
                                            {isRegistration ? 'Есть аккаунт? Войти' : 'Нет аккаунта?'}
                                        </a>
                                    </span>
                                </div>

                                <button type={'submit'} className={"btn btn-block btn-primary"} 
                                    onClick={() => {
                                        if(isRegistration){
                                            registrationButtonPressed();
                                        }else{
                                            loginButtonPressed();
                                        }
                                    }}
                                >
                                    {isRegistration ? 'Зарегистрироваться' : 'Войти'}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            
        </div>
    );
}
