import PackageService from "src/services/package.service";
import FileTypeService from "src/services/file-type.service";

export function list ({commit}) {
  return PackageService.getList().then(
    packages => {
      commit('fetchPackages', packages.data)
      return Promise.resolve(packages);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function add ({commit}, packageData) {
  return PackageService.createPackage(packageData).then(
    packageData => {
      if (packageData.data.id !== undefined) {
        commit('addPackage', packageData.data)
      }
      return Promise.resolve(packageData);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function deletePackage ({commit}, packageData) {
  return PackageService.deletePackage(packageData).then(
    packageData => {
      return Promise.resolve(packageData);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function updatePackage({commit}, packageData) {
  return PackageService.updatePackage(packageData).then(
    packageData => {
      return Promise.resolve(packageData);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

