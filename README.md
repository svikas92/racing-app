## it is assumed that node and npm are installed on the machine, if not, please follow below steps first
1. sudo apt-get install nodejs
2. sudo npm install -g npm
3. sudo npm install -g typescript
4. sudo npm install -g ts-node

###
I have implemented 3 ways to run the processes
## running 3 seperate processes on 3 different terminals
#### method 1
1. run -> npm install
2. run -> npm run racer1 (T1)
3. run -> npm run racer2 (T2)
4. run -> npm run master (T3)

#using this method, you will be able to see seperate outputs for each processes on separate terminals

#### method 2
1. run -> sudo sh ./start.sh

# this will install the dependencies required for launching the process
# output for each process will be merged on the same shell


#### method 3 - separate docker containers for all the 3 processes
1. run -> docker-compose up --build

# this will launch 3 containers and the first lap log will be visible on the console
# but unfortunately continue calls to the master container is not working
# i do not have any experience with docker, so i could not track down the issue
# please suggest what am i doing wrong here.

###### project details
	## racer processes will stop if they find any parallel or identical lines by informing on the console.
	## if stopped, restart will be required for all the processes
	## intersection points will also be printed with each lap
	## a random generator function is written for generating integer m and c
	## range for m and c are configurable and currenly set to [-10, 10] in master/src/models/master.ts

