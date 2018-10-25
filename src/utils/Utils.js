import {IPServer} from '../Server/IPServer'
exports.change_url_image = (img) => {
  return img.replace('http://localhost:3000', IPServer.ip);
}