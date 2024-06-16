import {useEffect, useState} from 'react'
import './App.css';
import {Layout, Card, Button, Modal, Form, Input, Table, Progress, Flex,} from 'antd';
import axios from "axios";

const {Header, Content,} = Layout;

function App() {

    useEffect(() => {
        allFarmerPaddy();
        allConditions();
        waterPercent();
    }, []);


    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const showModal1 = () => {
        setIsModalOpen1(true);
    };
    const handleOk1 = () => {
        setIsModalOpen1(false);
    };
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };
    const showModal = () => {
        setIsModalOpen2(true);
    };
    const handleOk = () => {
        setIsModalOpen2(false);
    };
    const handleCancel = () => {
        setIsModalOpen2(false);
    };


    const [allFarmer, setAllFarmer] = useState([]);
    const [condition, setCondition] = useState([]);
    const [waterAVG, setwaterAVG] = useState();

    const [farmer_name, setFarmerName] = useState('');
    const [farmer_id, setFarmerId] = useState('');
    const [contact_number, setfarmerPhone] = useState();
    const [email, setFarmerEmail] = useState('');

    const [paddy_field_id, setPaddyId] = useState('');
    const [location, setPaddyLocation] = useState('');
    const [area, setPaddyArea] = useState();

    const allFarmerPaddy = async ()=>{

        try{

            const response = await axios.get('http://localhost:3000/api/v1/farmer/find-all');

            setAllFarmer(response.data);
            console.log(allFarmer);


        }catch (error) {
            console.log(error);
        }

    }

    const allConditions = async ()=>{

        try{

            const response = await axios.get('http://localhost:3000/api/v1/water-level/find-all');

            setCondition(response.data);
            console.log(condition);


        }catch (error) {
            console.log(error);
        }

    }

    const waterPercent = async ()=>{

        try{

            const response = await axios.get('http://localhost:3000/api/v1/water-level/find-water-level-AVG');

            setwaterAVG(response.data);
            console.log(waterAVG);


        }catch (error) {
            console.log(error);
        }

    }

    const saveFarmer = async ()=>{

        try{

            const response = await axios.post('http://localhost:3000/api/v1/farmer/create',{
                farmer_name,
                farmer_id,
                contact_number,
                email
            });

        
            console.log(response);
            allFarmerPaddy();

        }catch (error) {
            console.log(error);
        }

    }


    const savePaddy = async ()=>{

        try{

            const response = await axios.post('http://localhost:3000/api/v1/paddy/create',{
                paddy_field_id,
                location,
                area,
                farmer_id
            });

        
            console.log(response);
            allFarmerPaddy();

        }catch (error) {
            console.log(error);
        }

    }



    return (


        <div>

            <Layout className='main-outer'>
                <Header className='header'>
                    <div className='brand-name'>
                        <p>Water P@ss</p>

                    </div>
                </Header>

                <Layout className='sub-outer'>
                    <Content className='main-con'>

                        <Card className='card1'>
                            <div className='progrss'>
                                <h1>Progress of main factors</h1>
                            </div>
                            <div className='progrss-chrts'>
                                <div className='pofwater'>
                                    <p>Water level precent</p>
                                    <Flex className='water' wrap="wrap">
                                        <Progress type="circle" percent={41.3} size={200}/>
                                    </Flex>
                                </div>
                                <div className='pofrain'>
                                    <p> Today is Rain or Not</p>
                                    <Flex gap="small" wrap="wrap">

                                        <Progress type="circle" percent={100} size={200} format={() => 'Rain'}/>
                                    </Flex>
                                </div>


                            </div>


                        </Card>


                        <div className='data-inputs'>

                            <div className='but-mod1'>
                                <Button className='but1' type="primary" onClick={showModal1}>
                                    <div className='bgi1'>
                                        <div className='b1-text'>
                                            Add Farmers Informations
                                        </div>
                                    </div>
                                </Button>
                                <Modal className='mod1' width={650} okButtonProps={{style: {display: 'none'}}} title="Add Paddy field details" open={isModalOpen1}
                                       onOk={handleOk1} onCancel={handleCancel1}>
                                    <div style={{marginTop:'42px'}}>
                                        <Form onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                            name="wrap"
                                            labelCol={{
                                                flex: '110px',
                                            }}
                                            labelAlign="left"
                                            labelWrap
                                            wrapperCol={{
                                                flex: 1,
                                            }}
                                            colon={false}
                                            style={{
                                                maxWidth: 600,
                                            }}
                                        >
                                            <Form.Item
                                                label="Farmer Name"
                                                name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input onChange={(e)=>{
                                                    setFarmerName(e.target.value);
                                                }}/>
                                            </Form.Item>

                                            <Form.Item
                                                label="Farmer ID"
                                                name="farmer-id"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input onChange={(e)=>{
                                                    setFarmerId(e.target.value);
                                                }}/>
                                            </Form.Item>


                                            <Form.Item
                                                name="phone"
                                                label="Phone Number"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your phone number!',
                                                    },
                                                ]}
                                            >
                                                <Input onChange={
                                                    (e)=>{
                                                        setfarmerPhone(parseFloat(e.target.value));
                                                    }
                                                }

                                                    style={{
                                                        width: '100%',

                                                    }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name="email"
                                                label="E-mail"
                                                rules={[
                                                    {
                                                        type: 'email',
                                                        message: 'The input is not valid E-mail!',
                                                    },
                                                    {
                                                        required: true,
                                                        message: 'Please input your E-mail!',
                                                    },
                                                ]}
                                            >
                                                <Input onChange={(e)=>{
                                                    setFarmerEmail(e.target.value);
                                                }}/>
                                            </Form.Item>

                                                <div className="btn-submit-outer">
                                                <Button type='primary' onClick={saveFarmer}>Let's Save</Button>
                                                </div>

                                        </Form>
                                    </div>
                                </Modal>
                            </div>


                            <div className='but-mod2'>
                                <Button className='but2' type="primary" onClick={showModal}>
                                    <div className='bgi2'>
                                        <div className='b2-text'>
                                            Add Paddy fields Informations
                                        </div>
                                    </div>
                                </Button>
                                <Modal className='mod2' width={650} okButtonProps={{style: {display: 'none'}}} title="Add Paddy field details" open={isModalOpen2}
                                       onOk={handleOk} onCancel={handleCancel}>
                                    <div style={{marginTop:'42px'}}>
                                        <Form onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                            name="wrap"
                                            labelCol={{
                                                flex: '110px',
                                            }}
                                            labelAlign="left"
                                            labelWrap
                                            wrapperCol={{
                                                flex: 1,
                                            }}
                                            colon={false}
                                            style={{
                                                maxWidth: 600,
                                            }}
                                        >
                                            <Form.Item
                                                label="Lot No"
                                                name="lot no"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input onChange={(e)=>{
                                                    setPaddyId(e.target.value);
                                                }}/>
                                            </Form.Item>

                                            <Form.Item
                                                label="Lot Location"
                                                name="location"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input onChange={(e)=>{
                                                    setPaddyLocation(e.target.value);
                                                }}/>
                                            </Form.Item>

                                            <Form.Item
                                                label="Lot Area"
                                                name="area"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input onChange={(e)=>{
                                                    setPaddyArea(parseFloat(e.target.value));
                                                }}/>
                                            </Form.Item>

                                            <Form.Item
                                                label="Farmer ID"
                                                name="farmer-id"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input onChange={(e)=>{
                                                    setFarmerId(e.target.value);
                                                }}/>
                                            </Form.Item>

                                            <div className="btn-submit-outer">
                                                <Button type='primary' onClick={savePaddy}>Let's Save</Button>
                                                </div>


                                        </Form>
                                    </div>

                                </Modal>


                            </div>


                        </div>


                        <div>


                        </div>

                        <Card className='card4'>
                            <div className='table-name2'>
                                <p><h3> Paddy fields & Farmers Informations</h3></p>
                                <div className='paddy-table'>
                                    <Table className='table2' dataSource={allFarmer} columns={[
                                        {
                                            dataIndex: 'paddy_field_id',
                                            title: 'Lot No',
                                            key: 'paddy_field_id',
                                        },
                                        {
                                            dataIndex: 'farmer_id',
                                            title: 'Farmer ID',
                                            key: 'farmer_id',
                                        },

                                        {
                                            dataIndex: 'farmer_name',
                                            title: 'Farmer Name',
                                            key: 'farmer_name',
                                        },

                                        {
                                            dataIndex: 'location',
                                            title: 'Lot Location',
                                            key: 'location',
                                        },
                                        {
                                            dataIndex: 'area',
                                            title: 'Lot Area',
                                            key: 'area',
                                        },
                                        {
                                            dataIndex: 'email',
                                            title: 'E-mail',
                                            key: 'email',
                                        },
                                        {
                                            dataIndex: 'contact_number',
                                            title: 'Phone number',
                                            key: 'contact_number',
                                        },


                                    ]}/>


                                </div>
                            </div>

                        </Card> 

                        <Card className='card3'>
                            <div className='table-name3'>
                                <p><h3>Latest condition updates of paddy fields </h3></p>
                            </div>
                            <div className='paddytable-data'>
                                <Table className='table3' dataSource={condition} columns={[
                                    {
                                        dataIndex: 'paddy_field_id ',
                                        title: 'Lot No',
                                        key: 'paddy_field_id',
                                    },
                                    {
                                        dataIndex: 'water_level',
                                        title: 'Water Level',
                                        key: 'water_level',
                                    },
                                    {
                                        dataIndex: 'soil_moisture',
                                        title: 'Soil Condition (Wet/Dry)',
                                        key: 'soil_moisture',
                                    },
                                    {
                                        dataIndex: 'rainfall_status',
                                        title: 'Enviroment Condition (Rain or Not)',
                                        key: 'rainfall_status',
                                    },


                                ]}/>


                            </div>

                        </Card>

                        <Card className='card2'>
                            <div className='table-name1'>
                                <p><h3> During the last cropping season Details of the paddy fields </h3></p>
                            </div>
                            <div className='paddy-table'>
                                <Table className='table1' columns={[
                                    {
                                        dataIndex: 'lotno ',
                                        title: 'Lot No',
                                        key: 'lotno',
                                    },
                                    {
                                        dataIndex: 'farmerid',
                                        title: 'Farmer ID',
                                        key: 'farmerid',
                                    },
                                    {
                                        dataIndex: 'name',
                                        title: 'Farmer Name',
                                        key: 'name',
                                    },
                                    {
                                        dataIndex: 'location',
                                        title: 'Lot Location',
                                        key: 'location',
                                    },
                                    {
                                        dataIndex: 'amount-water',
                                        title: 'Amount of water applied during the last cropping season',
                                        key: 'amount-water',
                                    },


                                ]}/>


                            </div>

                        </Card>


                        <Card className='card5'>

                        </Card>


                    </Content>

                </Layout>

            </Layout>

        </div>
    );

}


export default App;

