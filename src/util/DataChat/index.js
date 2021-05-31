export const dataSend = (to, collapse, body, title, bodyData, titleData, key1, key2, key3, key4) => {
  const data = {
    to : to,
    collapse_key : collapse,
    notification : {
          message :  body,
          title : title,
          priority: "high"
      },
    data : {
      priority: "high",
      message : bodyData,
      type: "Chatting",
      title: titleData,
      trx_id : key1,
      id_order : key2,
      id_mitra: key3,
      nama_mitra: key4,
      token: to,
      screen: 'Chatting',
    }
  }
  // console.log(data)
  return data;
}