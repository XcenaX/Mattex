import styles from './style.module.css'
import styles2 from '../../../../../pages/login/style.module.css'

export default function OrderInfo(props){
    return(
        <div>
            {props.order.mattress !== undefined ? (
                <>
                    {/* <br/>
                    <p className={styles.title}>Основа</p>
                    <p className={styles.info}>{props.order.mattress.base.title}</p>
                    <br/>
                    <p className={styles.title}>Чехол</p>
                    <p className={styles.info}>{props.order.mattress.case.title}</p>
                    <br/>
                    <p className={styles.title}>Сторона 1</p>
                    <ul className={styles.list}>
                        {
                            props.order.mattress.side1.map(item => (
                                <li className={styles.info}>{item.title}</li>
                            ))
                        }
                    </ul>
                    <br/>
                    <p className={styles.title}>Сторона 2</p>
                                                                  
                    <ul className={styles.list}>
                        {
                            props.order.mattress.side2.map(item => (
                                <li className={styles.info}>{item.title}</li>
                            ))
                        }
                    </ul> */}

                    <div className={styles2.form_block} style={{padding:'0px'}}>                                                
                        <form className={styles2.modal_form}>
                            <div className={styles2.form_group + " " + styles2.first}>
                                <label htmlFor="osnova">Основа</label>
                                <input className={styles2.form_control} disabled value={props.order.mattress.base.title} id='osnova' />
                            </div>
                            <div className={styles2.form_group + " " + styles2.first}>
                                <label htmlFor="chehol">Чехол</label>
                                <input className={styles2.form_control} disabled value={props.order.mattress.case.title} id='chehol' />
                            </div>                                                        
                            <div className={styles2.form_group + " " + styles2.first}>
                                <div className={styles2.label}>Сторона 1</div>
                                <ul className={styles.list}>
                                    {
                                        props.order.mattress.side1.map(item => (
                                            <li className={styles.info}>{item.title}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className={styles2.form_group + " " + styles2.first}>
                            <div className={styles2.label}>Сторона 2</div>
                                <ul className={styles.list}>
                                    {
                                        props.order.mattress.side2.map(item => (
                                            <li className={styles.info}>{item.title}</li>
                                        ))
                                    }
                                </ul>
                            </div>

                        </form>
                    </div>               
                    
                </>
            ) : (
                <>
                    <br/>
                    <p className={styles.title}>Название</p>
                    <p className={styles.info}>{props.order.catalogMattress.name}</p>
                    <br/>
                    <p className={styles.title}>Ткань</p>
                    <p className={styles.info}>{props.order.catalogMattress.cloth}</p>
                    <br/>
                    <p className={styles.title}>Себес матраса</p>
                    <p className={styles.info}>{props.order.catalogMattress.price}</p>
                    <br/>
                    <p className={styles.title}>Выбранный размер</p>
                    <p className={styles.info}>{props.order.size}</p>
                    <br/>
                    <p className={styles.title}>Цена с учетом размера и наценкой</p>
                    <p className={styles.info}>{props.order.totalSum}</p>
                    <br/>
                </>
            )}

        </div>
    );
}
