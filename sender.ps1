if ($tokenJson) { Remove-Variable tokenJson }
if ($token) { Remove-Variable token }
$Email = Read-Host -Prompt 'Įveskite prisijungimo e. pašto adresą'
$response = Read-host "Įveskite slaptažodį" -AsSecureString 
$password = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($response))
$Url = "http://localhost:8080/auth/login"
$loginBody = @{
        "email" = "$Email"
        "password" = "$password"
    } | ConvertTo-Json
$tokenJson = Invoke-WebRequest -UseBasicParsing $Url -ContentType "application/json" -Method POST -Body $loginBody
if ($tokenJson) {
    $jsonObj = $tokenJson | ConvertFrom-Json
    $token = $jsonObj.token
    do{
        $log = "./BluetoothView.exe /scomma bt.txt"
        iex $log
        $text = Get-Content .\bt.txt -Raw
        $Url = "http://localhost:8080/api/log"
        $headers = @{
            'Authorization' = "Bearer $token"
            'ContentType' = "application/json"
        }
        $Body = @{
            "bluetoothContents" = "$text"
        } | ConvertTo-Json
        $send = Invoke-WebRequest -UseBasicParsing $Url -Method POST -Headers $headers -Body $Body
        if ($send) {"Sėkmingai nusiųsta aptiktų Bluetooth įrenginių informacija.."}
        else {"Siunčiant aptiktų Bluetooth įrenginių duomenis iškilo klaida.."}
        start-sleep -Seconds 20
    
    }until($infinity)
}