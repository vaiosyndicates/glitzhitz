export const dataSend = (to, collapse, body, title, bodyData, titleData, key1, key2) => {
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
      key_1 : key1,
      key_2 : key2
    }
  }

  return data;
}