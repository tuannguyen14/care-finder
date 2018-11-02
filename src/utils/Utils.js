import {IPServer} from '../Server/IPServer'
exports.change_url_image = (img) => {
  return img.toString().replace('http://localhost:3000', IPServer.ip);
}