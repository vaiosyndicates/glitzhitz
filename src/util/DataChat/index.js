export const dataSend = (obj) => {
  const data = {
    to : obj.to,
    collapse_key : 'type_a',
    notification : {
          priority: "high",
          title : "New Chat Message", 
          message: "Glitz Hitz", 
      },
    data : {
      priority: "high",
      message : obj.chat_content,
      type: "Chatting",
      title: "New Message",
      trx_id : obj.trx_id,
      id_order : obj.id_order,
      nama_mitra: obj.nama_mitra,
      nama_customer: obj.nama_user,
      token_receiver: obj.token_receiver,
      token_sender: obj.token_sender,
      flag: 6,
    }
  }
  // // console.log(selftoken)
  return data;
}