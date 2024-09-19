import React from 'react'
import "./Ticket.css"
import AccountCircleIcon from "../../assets/AccountCircleIcon.svg"
import CheckIcon from "../../assets/CheckIcon.svg"
import EmailIcon from "../../assets/EmailIcon.svg"
import CircleIcon from "../../assets/CircleIcon.svg"

function Ticket({ticket}) {
  return (
    <div className='ticket-main'>
        <div className='ticket-header'>
            <div className='ticket-id'>{ticket.id}</div>
            <img src={AccountCircleIcon} alt="" />
        </div>
        <div className='ticket-content'>
            <div className='ticket-content-title'>
                <img src={CheckIcon} alt="" />
                <div className='ticket-title'><b>{ticket.title}</b></div>
            </div>
        </div>
        <div className='ticket-metadata'>
            <div className='ticket-tags'>
            <div className="ticket-tag">
                <img src={EmailIcon} alt="" />
            </div>
            {ticket.tag.map((tag, key) => {
                return (
                        <div key={key} className='ticket-tag'>
                            <img src={CircleIcon} alt="" />
                            <div>
                                {tag}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Ticket;