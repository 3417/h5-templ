import dayjs from 'dayjs';
const Plugin =  {
    formatChTime:(v)=>{
        return v ? dayjs(v).format("YYYY年MM月DD日 HH时mm分ss秒"):'--'
    },
    formatDate:()=>{
      return v ? dayjs(v).format("YYYY/MM/DD HH:mm"):'--'
    }
}

export default (app) => {
    Object.keys(Plugin).forEach(item => {
      app.filter(item, Plugin[item]);
    })
  }