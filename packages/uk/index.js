import ukeyActor from './ukeyActor'

function getUkeyParams(bankUkeyParamsObject) {
  let ukeyActorClass = new ukeyActor()
  return ukeyActorClass.getUkeyParams(bankUkeyParamsObject)
}

function signCallBack(bankCode, ukeySenceSignObject, signedCallBack) {
  let ukeyActorClass = new ukeyActor()
  return ukeyActorClass.signCallBack(bankCode, ukeySenceSignObject, signedCallBack)
}

export {
  getUkeyParams,
  signCallBack
}