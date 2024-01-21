const { stdout } = process;
const flag = process.argv[2];

if (flag === '-d') {
  stdout.write(__dirname);
} else if (flag === '-f') {
  stdout.write(__filename);
} else {
  stdout.write('Please run the program with the -d or -f flag');
}
