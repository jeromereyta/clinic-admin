import FileTypeService from "src/services/file-type.service";

export function list ({commit}) {
  return FileTypeService.getList().then(
    fileTypes => {
      commit('fetchFileTypes', fileTypes.data)
      return Promise.resolve(fileTypes);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function add ({commit}, fileType) {
  return FileTypeService.createFileType(fileType).then(
    fileType => {
      if (fileType.data.id !== undefined) {
        commit('addFileTypes', fileType.data)
      }
      return Promise.resolve(fileType);
    },
    error => {
      return Promise.reject(error);
    }
  );
}
