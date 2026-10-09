import { md, util } from 'node-forge';

export default file => new Promise((resolve, reject) => {
  const fileSize = file.size;
  const chunkSize = 1024 * 1024; // bytes
  let offset = 0;
  let chunkReaderBlock = null;
  let fileBin = '';

  const readEventHandler = (evt) => {
    if (evt.target.error == null) {
      offset += evt.target.result.length;
      fileBin += evt.target.result;
    } else {
      console.log(`Error:  ${evt.target.error}`);
      return reject(false);
    }
    if (offset >= fileSize) {
      console.log('Lectura terminada.');
      const obj = util.createBuffer(fileBin);
      const bytes = obj.getBytes();

      const message = md.sha256.create();
      message.update(bytes);
      const md5Msg = message.digest().toHex();

      return resolve({
        fileName: file.name,
        hash: md5Msg.toUpperCase(),
      });
    }

    return chunkReaderBlock(offset, chunkSize, file);
  };

  chunkReaderBlock = (_offset, length, _file) => {
    const r = new FileReader();
    const blob = _file.slice(_offset, length + _offset);
    r.onload = readEventHandler;
    r.readAsBinaryString(blob);
  };

  chunkReaderBlock(offset, chunkSize, file);
});
