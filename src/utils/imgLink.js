export default ({ img }) => `${process.env.VUE_APP_SERVER_URL}imgs/${img?.id}.${img?.format}`

