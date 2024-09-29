import zlib
name = input("name: ")
print(zlib.crc32(name.encode()))