import React from 'react'
import {useState, useEffect} from 'react'
import "./Dashboard.css"
import List from '../List/List'

import Backlog from "../../assets/Backlog.svg"
import Todo from "../../assets/Todo.svg"
import InProgress from "../../assets/InProgress.svg"
import Done from "../../assets/Done.svg"
import Cancelled from "../../assets/Cancelled.svg"
import add from "../../assets/add.svg"
import AccountCircleIcon from "../../assets/AccountCircleIcon.svg"
import DotMenu from "../../assets/DotMenu.svg"

import NoPriority from "../../assets/NoPriority.svg"
import Low from "../../assets/Low.svg"
import Medium from "../../assets/Medium.svg"
import High from "../../assets/High.svg"
import Urgent from "../../assets/Urgent.svg"

function Dashboard({statuses, priorities, priorityScores, grouping, ordering}) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({"tickets": [],
        "users": []  
    })

    const statusIcons = {
        'Backlog': Backlog,
        'Todo': Todo,
        'InProgress': InProgress,
        'Done': Done,
        'Cancelled': Cancelled,
      };
      
      const priorityIcons = {
        0: NoPriority,
        1: Low,
        2: Medium,
        3: High,
        4: Urgent,
      };

    // fetch data from API
    useEffect(() => {
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
        .then(response => {
          if(response.ok) {
            return response.json();
          }
          throw response
        })
        .then(response => {
          setData(response)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
      }, [])

    const [ticketMap, setTicketMap] = useState([])

    function cmpTitle(a, b) {
        return a.title.localeCompare(b.title);
    }

    function cmpPriority(a, b) {
        return b.priority - a.priority;
    }

    // group - status, order - title
    let statusTicketMapTitle = () => {
        let obj = []
        statuses.forEach(status => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if(status === ticket.status) tmp.push(ticket)
            })
            tmp.sort(cmpTitle)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

    // group - status, order - priority
    let statusTicketMapPriority = () => {
        let obj = []
        statuses.forEach(status => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if(status === ticket.status) tmp.push(ticket)
            })
            tmp.sort(cmpPriority)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

    // group - users, order - title
    let userTicketMapTitle = () => {
        let obj = []
        data['users'].forEach(user => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if(user.id === ticket.userId) tmp.push(ticket)
            })
            tmp.sort(cmpTitle)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

    // group - users, order - priority
    let userTicketMapPriority = () => {
        let obj = []
        data['users'].forEach(user => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if(user.id === ticket.userId) tmp.push(ticket)
            })
            tmp.sort(cmpPriority)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

    // group - priority, order - title
    let priorityTicketMapTitle = () => {
        let obj = []
        priorityScores.forEach(priority => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if(priority === ticket.priority) tmp.push(ticket)
            })
            tmp.sort(cmpTitle)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

    // group - priority, order - priority
    let priorityTicketMapPriority = () => {
        let obj = []
        priorityScores.forEach(priority => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if(priority === ticket.priority) tmp.push(ticket)
            })
            tmp.sort(cmpPriority)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

    useEffect(() => {
        if(grouping === 'Status' && ordering === 'Priority') {
            statusTicketMapPriority()
        } else if(grouping === 'Status' && ordering === 'Title') {
            statusTicketMapTitle()
        } else if(grouping === 'User' && ordering === 'Priority') {
            userTicketMapPriority()
        } else if(grouping === 'User' && ordering === 'Title') {
            userTicketMapTitle()
        } else if(grouping === 'Priority' && ordering === 'Priority') {
            priorityTicketMapPriority()
        } else if(grouping === 'Priority' && ordering === 'Title') {
            priorityTicketMapTitle()
        }
    }, [grouping, ordering])

    useEffect(() => {
        if(grouping === 'Status' && ordering === 'Priority') {
            statusTicketMapPriority()
        } else if(grouping === 'Status' && ordering === 'Title') {
            statusTicketMapTitle()
        } else if(grouping === 'User' && ordering === 'Priority') {
            userTicketMapPriority()
        } else if(grouping === 'User' && ordering === 'Title') {
            userTicketMapTitle()
        } else if(grouping === 'Priority' && ordering === 'Priority') {
            priorityTicketMapPriority()
        } else if(grouping === 'Priority' && ordering === 'Title') {
            priorityTicketMapTitle()
        }
    }, [data])
    
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

  return (
    <div className='dashboard-main'>
        {grouping === "Status" ? 
            ticketMap.map((ticketList, key) => {
                return (
                <div className='dashboard-list'>
                    <div className='dashboard-list-header-controls'>
                        <div className='dashboard-list-header-controls-info'>
                        <img src={statusIcons[statuses[key]]} alt={statuses[key]} />
                            <b><p className='dashboard-list-header'>{statuses[key]}</p></b>
                            <div className='dashboard-list-items-count'>{ticketList.length}</div>
                        </div>
                        {ticketList.length !== 0 && <div>
                            <img src={add} alt="" />
                  <img src={DotMenu} alt="" />
                        </div>}
                    </div>
                    <List key={key} ticketList={ticketList} />
                </div>
                )
            })
        :
        grouping === 'User' ? 
            ticketMap.map((ticketList, key) => {
                return (
                <div className='dashboard-list'>
                    <div className='dashboard-list-header-controls'>
                            <div className='dashboard-list-header-controls-info'>
                            <img src={AccountCircleIcon} alt="" />
                                <b><p className='dashboard-list-header'>{data['users'][key].name}</p></b>
                                <div className='dashboard-list-items-count'>{ticketList.length}</div>
                            </div>
                            {ticketList.length !== 0 && <div>
                                <img src={add} alt="" />
                  <img src={DotMenu} alt="" />
                            </div>}
                        </div>
                    <List key={key} ticketList={ticketList} />
                </div>
                )
            })
        :
        grouping === 'Priority' ? 
            ticketMap.map((ticketList, key) => {
                return (
                <div className='dashboard-list'>
                    <div className='dashboard-list-header-controls'>
                            <div className='dashboard-list-header-controls-info'>
                            <img src={priorityIcons[priorityScores[key]]} alt={priorities[key]} />
                                <b><p className='dashboard-list-header'>{priorities[key]}</p></b>
                                <div className='dashboard-list-items-count'>{ticketList.length}</div>
                            </div>
                            {ticketList.length !== 0 && <div>
                                <img src={add} alt="" />
                  <img src={DotMenu} alt="" />
                            </div>}
                        </div>
                    <List key={key} ticketList={ticketList} />
                </div>
                )
            })
        :
        (<span>No conditions met</span>)
        }
    </div>
  )
}

export default Dashboard