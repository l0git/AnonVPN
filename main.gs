proxyes = {"[IP]":"[pass]"}

go = function(shell, ip, pass)
    return shell.connect_service(ip, 22, "root", pass)
end function

shell = get_shell
for i in proxyes
	error = 0
	ip = i.key
	pass = i.value
	nextShell = go(shell, ip, pass)
	if not nextShell then 
		print("<color=#FF0000>Proxy "+ip+" doesn't respond</color>")
		error = 1
		continue
	else if error != 1 then
		nextShell.host_computer.touch("/var", "system.tmp")
		nextShell.host_computer.File("/var/system.tmp").move("/var", "system.log")
		shell = nextShell
		print("Connected to "+ip)
	end if
end for
shell.start_terminal