import React, {useState, useEffect} from 'react';
import { getVacation  } from '../../Services';


function Main(){

    const name = window.sessionStorage.getItem("userName");
    const [user, setUser] = useState([]);
    
    useEffect(()=>{
        var mounted=false;
        getVacation('api/vacation', name).then(({data})=>{
            if(!mounted){
                setUser(data);
            }
        })
        return(()=>mounted=true);
    },[]);

    return(
        <div>
            <h2>{user[1]+"님의 총 휴가는 "+user[11]+", 잔여 휴가일수는 "+user[12]+"개 입니다."}</h2>

            <a href="https://goo.gl/forms/k34aKtz0XKed78M23" alt="휴가신청">휴가신청</a>

            <h6>종일 휴가의 경우는 기간입력으로 한번에 휴가신청이 가능합니다.</h6>
            <h6>반차 + 종일 신청시 반차와 종일 기간을 각각 신청해주시기 바랍니다. (자동 log용)</h6>
            <h6>징검다리 휴일 등은 분기/반기 개시 전에 협의하여 공동연차 사용으로 진행 예정입니다.</h6>
            <h6>연차 사용 현황은 반기에 한번씩 개인공지하도록 하겠습니다.</h6>

            <a href="" alt="로그아웃">로그아웃</a>
        </div>
    )

}

export default Main;