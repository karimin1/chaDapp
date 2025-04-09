const hre =require('hardhat');
async function main(){
    const ChatDApp=await hre.ethers.getContractFactory('ChatApp');
    const chatDapp=await ChatDApp.deploy({gasLimit:20000000 });
    await chatDapp.deployed();
    console.log(`chatDapp is deployed in :${chatDapp.address}`);
}
main().catch((error)=>{
    console.log('error',error);
});
