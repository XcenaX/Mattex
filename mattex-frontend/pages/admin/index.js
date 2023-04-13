import Header from "../../src/components/Header/Header";
import styles from './style.module.css'
import React, {useEffect, useState} from "react";
import SalesTable from "../../src/components/AdminTables/SalesTable";
import axios from "axios";
import helpers from "../../src/helpers";
import MattressCasesTable from "../../src/components/AdminTables/MattressCasesTable";
import MattressBasesTable from "../../src/components/AdminTables/MattressBasesTable";
import MattressLayersTable from "../../src/components/AdminTables/MattressLayersTable";
import MattressTable from "../../src/components/AdminTables/MattressTable";
import OrdersTable from "../../src/components/AdminTables/OrdersTable";
import ModalWindow from "../../src/components/ModalWindow";
import AddItemToDatabaseBody from "../../src/components/ModalBodies/AddItemToDatabaseBody";
import UsersTable from "../../src/components/AdminTables/UsersTable";
import ConstructorBody from "../../src/components/ModalBodies/ConstructorBody";
import AddLayerBody from "../../src/components/ModalBodies/AddItemToDatabaseBody/AddLayerBody";
import AddCaseBody from "../../src/components/ModalBodies/AddItemToDatabaseBody/AddCaseBody";
import AddBaseBody from "../../src/components/ModalBodies/AddItemToDatabaseBody/AddBaseBody";
import AddCatalogMattressBody from "../../src/components/ModalBodies/AddItemToDatabaseBody/AddCatalogMattressBody";

import Head from "next/head";

export default function AdminPage(){
    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('Default body')
    const [modalTitle, setModalTitle] = useState('')

    const [sales, setSales] = useState([
        {
            id: 0,
            name: 'Виана кокос',
            description: 'Виана (безпружинный матрас)|Матрас состоит из моноблока пенополеуретан высокой плотности.|Ткань трикотаж или вискоза простеганный на 300гр синтепоне|Гарантия 36 месяцев|- средней жесткости, выдерживает нагрузку до 130 кг на одно спальное место.|Матрас состоит из моноблока пенополиуретана. Материал пористый, нетоксичный и экологически безопасный. Обладает привлекательной средней жесткостью. Великолепно подходит для покупателей, опасающихся аллергической реакции на натуральные наполнители.Надежная обивка сшита из хлопкового жаккардового полотна.|Беспружинный матрас высокой жесткости из высококачественной пены упругость и эластичность которого создают отличные условия для комфортного сна. Пена в данной модели используется высокой плотности.',
            cloth: 'Жаккард с пролоном 1см',
            size: 'Средне жесткий',
            price: 15000,
            date: '2021-12-15'
        },
        {
            id: 1,
            name: 'Виана кокос',
            description: 'Виана (безпружинный матрас)|Матрас состоит из моноблока пенополеуретан высокой плотности.|Ткань трикотаж или вискоза простеганный на 300гр синтепоне|Гарантия 36 месяцев|- средней жесткости, выдерживает нагрузку до 130 кг на одно спальное место.|Матрас состоит из моноблока пенополиуретана. Материал пористый, нетоксичный и экологически безопасный. Обладает привлекательной средней жесткостью. Великолепно подходит для покупателей, опасающихся аллергической реакции на натуральные наполнители.Надежная обивка сшита из хлопкового жаккардового полотна.|Беспружинный матрас высокой жесткости из высококачественной пены упругость и эластичность которого создают отличные условия для комфортного сна. Пена в данной модели используется высокой плотности.',
            cloth: 'Жаккард с пролоном 1см',
            size: 'Средне жесткий',
            price: 15000,
            date: '2021-12-15'
        },
    ]);

    const [mattressCases, setMattressCases] = useState([])
    const [mattressBases, setMattressBases] = useState([])
    const [mattressLayers, setMattressLayers] = useState([]);
    const [mattresses, setMattresses] = useState([]);

    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);

    const loadData = async () => {
        axios.get(helpers.serverDomain + '/orders').
        then(res => {
            setOrders(res.data);
        }).catch(() => {
            alert('Что-то пошло нетак при загрузке заказов!');
        });

        axios.get(helpers.serverDomain + '/users').
        then(res => {
            setUsers(res.data);
        }).catch(() => {
            alert('Что-то пошло нетак при загрузке пользователей!');
        });

        axios.get(helpers.serverDomain + '/mattresses/cases').
        then(res => {
            setMattressCases(res.data);
        }).catch(() => {
            alert('Что-то пошло нетак при загрузке чехлов!');
        });

        axios.get(helpers.serverDomain + '/mattresses/layers').
        then(res => {
            setMattressLayers(res.data);
        }).catch(() => {
            alert('Что-то пошло нетак при загрузке слоев!');
        });

        axios.get(helpers.serverDomain + '/mattresses/bases').
        then(res => {
            setMattressBases(res.data);
        }).catch(() => {
            alert('Что-то пошло нетак при загрузке основ!');
        })

        axios.get(helpers.serverDomain + '/mattresses/catalogMatresses').
        then(res => {
            setMattresses(res.data);
        }).catch(() => {
            alert('Что-то пошло нетак при загрузке слоев!');
        });
    }

    const openConstructorModal = () => {
        setModalBody(<ConstructorBody/>)
        setModalTitle('Конструктор матрасов')
        setShowModal(!showModal)
    }

    const openLayerAdd = () => {
        setModalBody(<AddLayerBody/>)
        setModalTitle('Добавить слой')
        setShowModal(!showModal)
    }

    const openBaseAdd = () => {
        setModalBody(<AddBaseBody/>)
        setModalTitle('Добавить основу')
        setShowModal(!showModal)
    }

    const openCaseAdd = () => {
        setModalBody(<AddCaseBody/>)
        setModalTitle('Добавить чехол')
        setShowModal(!showModal)
    }

    const openMattressAdd = () => {
        setModalBody(<AddCatalogMattressBody/>)
        setModalTitle('Добавить матрас')
        setShowModal(!showModal)
    }

    useEffect(() => {
        helpers.checkAuthorization(helpers.roles.ADMIN);
        loadData();
    }, []);

    return(
        <div className={styles.body}>
            <Head>
                <title>Mattex - Админ панель</title>
                <link rel="icon" href="/" />            
            </Head>
            <Header openConstructorModal={openConstructorModal}/>
            <div className={styles.container}>
                <div style={{
                    display: showModal ? 'flex': 'none',
                    width: '100%',
                    justifyContent: 'center'
                }}>
                    <ModalWindow body={modalBody} setShowModal={setShowModal} title={modalTitle}/>
                </div>

                {/* <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <button
                        onClick={() => {
                            setModalBody(<AddItemToDatabaseBody/>);
                            setModalTitle('Добавить в базу данных');
                            setShowModal(true);
                        }}
                        className={styles.button}
                    >
                        Добавить в базу
                    </button>
                </div> */}
                        
                <OrdersTable admin={true} orders={orders} />            
                
                <UsersTable admin={true} users={users}/>
                
                <MattressCasesTable admin={true} cases={mattressCases} setShowModal={openCaseAdd}/>
                
                <MattressBasesTable admin={true} bases={mattressBases} setShowModal={openBaseAdd}/>                
                
                <MattressLayersTable admin={true} layers={mattressLayers } setShowModal={openLayerAdd}/>

                <MattressTable admin={true} matresses={mattresses } setShowModal={openMattressAdd}/>
            </div>
        </div>
    );
}
