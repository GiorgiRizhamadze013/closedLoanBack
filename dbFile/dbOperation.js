const config = require('./dbConfig');
sql =require('mssql');

const getClosedLoans=async (personalNo,agreementNo)=>{

    
    try {
        let pool = await sql.connect(config);
        let closedLoans = pool.request().query(`SELECT * FROM [CrystalDB].[dbo].[vClosedLoans] where PersonalNo='${personalNo}' or AgreementNo='${agreementNo}'`)
        console.log(closedLoans);
        return closedLoans
    } catch(error) {
        console.log(error);
        
    }

   
}

const updateClosedLoans=async (closedLoan)=>{
    closedLoan.savedData.map(async loan=>{
        console.log('closedLoan ',loan);
        try {
            let pool = await sql.connect(config);
            let closedLoansk = pool.request().query(`UPDATE [CrystalDB].[dbo].[KEEPER_ClosedLoans] SET [Status] = N'${loan.status}',[packN]='${loan.packN}' ,[boxN]='${loan.boxN || ''}' WHERE LoanId=${loan.id}`)
            let closedLoansL = pool.request().query(`UPDATE [CrystalDB].[dbo].[LMS_ClosedLoans] SET [Status] = N'${loan.status}',[packN]='${loan.packN}' ,[boxN]='${loan.boxN || ''}' WHERE LoanId=${loan.id}`)
            return closedLoansk , closedLoansL
        } catch(error) {
            console.log(error);  
        }
    })
   
}

module.exports={
    getClosedLoans,
    updateClosedLoans
}