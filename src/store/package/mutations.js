export function addPackage(state, packageData) {
  state.packages.push(packageData.data);
}

export function fetchPackages(state, packages) {
  state.packages = packages;
}

