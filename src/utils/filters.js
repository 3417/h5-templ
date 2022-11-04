import dayjs from 'dayjs';
const Plugin =  {
    formatTime:(v)=>{
        return v ? dayjs(v).format("YYYY-MM-DD HH:mm:ss"):'--'
    }
}

export default (app) => {
    Object.keys(Plugin).forEach(item => {
      app.filter(item, Plugin[item]);
    })
  }