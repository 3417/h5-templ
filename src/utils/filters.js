import dayjs from 'dayjs';
const Plugin =  {
    formatTime:(v)=>{
        // return v ? dayjs(v).format("YYYY-MM-DD HH:mm:ss"):'--'
        return v ? dayjs(v).format("YYYY年MM月DD日 HH时mm分ss秒"):'--'
    }
}

export default (app) => {
    Object.keys(Plugin).forEach(item => {
      app.filter(item, Plugin[item]);
    })
  }