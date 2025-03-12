import './page.css';
import Link  from "next/link";
import {FaArrowLeft , FaBook } from 'react-icons/fa';
import { PiTreeStructureThin } from "react-icons/pi";
const Info = () =>{
    return(
        <div className="info-component">
            <div className="info-component-in">
                <div className="info-component-in-header">
                    <Link href="/" className='info-component-in-header-link'> 
                        <FaArrowLeft /> Back to Home
                    </Link>
                    <Link className='info-component-in-header-link' href="https://kluniversityin-my.sharepoint.com/personal/brambabu_kluniversity_in/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FAttachments%2FSVR%20PRESENTATION%20EDITED%2Epdf&parent=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FAttachments&ct=1738051660761&or=OWA%2DNT%2DMail&cid=718191f7%2D1930%2D4f2a%2D1586%2D2bac39299305&ga=1"> 
                        <FaBook /> View SVR HandBook
                    </Link>
                    <Link href="/organogram" className='info-component-in-header-link'>
                    <PiTreeStructureThin />View Organogram
                    </Link>
                </div>
                <div className="info-main-one">
                    <h1>Vision and Mission of the Initiative</h1>
                    <p>
                    Our vision is to develop model villages with progressive and dynamic features, while ensuring the holistic development of students through active community engagement and real-time projects. 
                    </p>
                    <p>To impart quality higher education and to undertake research and extension with emphasis on application and innovation that cater to the emerging societal needs through all-round development of the students of all sections enabling them to be globally competitive and socially responsible citizens with intrinsic values </p>
                </div>
                <div className="info-main-two">
                    <h1>Objectives of the Initative</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatibus fuga, hic eum iusto velit alias atque nostrum ipsum quia dolorem sequi id ad veritatis veniam deleniti soluta delectus. Atque.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur nihil eligendi laudantium deleniti veniam ipsa nulla esse, corporis illo aperiam cumque aspernatur reiciendis autem, nobis, voluptates sequi harum? Provident, aliquid!
                        
                    </p>
                </div>
            </div>
        </div>
    )   
}
export default Info;