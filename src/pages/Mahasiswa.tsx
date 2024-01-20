import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

type TypeDataMahasiswa = {
  name: string;
  tanggal_lahir: string;
  alamat: string;
  id: number;
};

export default function Mahasiswa() {
  const [dataMahasiswa, setDataMahasiswa] = useState<TypeDataMahasiswa[]>([]);
  const [newMahasiswa, setNewMahasiswa] = useState<TypeDataMahasiswa>({
    name: "",
    tanggal_lahir: "",
    alamat: "",
    id: 0,
  });

  const [editMahasiswa, setEditMahasiswa] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const hendleGetMahasiswa = async () => {
    try {
      const response = await axios.get(
        "https://65955e5804335332df829205.mockapi.io/api-nashta/v1/mahasiswa"
      );
      setDataMahasiswa(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateMahasiswa = async () => {
    try {
      const response = await axios.post(
        "https://65955e5804335332df829205.mockapi.io/api-nashta/v1/mahasiswa",
        newMahasiswa
      );
      setDataMahasiswa([...dataMahasiswa, response.data]);

      setNewMahasiswa({
        name: "",
        tanggal_lahir: "",
        alamat: "",
        id: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handDataEditMahasiswa = (mahasiswa: TypeDataMahasiswa) => {
    // menangkap data mahasiswa yang sudah ada
    setNewMahasiswa({
      name: mahasiswa.name,
      tanggal_lahir: mahasiswa.tanggal_lahir,
      alamat: mahasiswa.alamat,
      id: mahasiswa.id,
    });
    // agar data mahasiswa yang di ambil berdasar kan id
    setEditMahasiswa(mahasiswa.id);
  };

  const handleClickEditMahasiswa = async () => {
    try {
      const response = await axios.put(
        `https://65955e5804335332df829205.mockapi.io/api-nashta/v1/mahasiswa/${editMahasiswa}`,
        newMahasiswa
      );

      // Update dataMahasiswa dengan data yang sudah diubah
      setDataMahasiswa((prevData) =>
        prevData.map((mahasiswa) =>
          mahasiswa.id === editMahasiswa ? response.data : mahasiswa
        )
      );

      // Reset nilai pada formulir dan editMahasiswa setelah berhasil diubah
      setNewMahasiswa({
        name: "",
        tanggal_lahir: "",
        alamat: "",
        id: 0,
      });
      setEditMahasiswa(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMahasiswa = async (id: number) => {
    try {
      const response = await axios.delete(
        `https://65955e5804335332df829205.mockapi.io/api-nashta/v1/mahasiswa/${id}`
      );

      setDataMahasiswa((iteMDelete) =>
        iteMDelete.filter((mahasiswa) => mahasiswa.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSerachMahasiswa = async (searchTerm: string) => {
    try {
      // tampilkan semua data jika tidak search data mahasiswa
      if (!searchTerm) {
        setDataMahasiswa([]);
        hendleGetMahasiswa();
        return;
      }

      // Lakukan pencarian berdasarkan nama
      const response = await axios.get(
        `https://65955e5804335332df829205.mockapi.io/api-nashta/v1/mahasiswa?name=${searchTerm}`
      );

      // Perbarui dataMahasiswa dengan hasil pencarian
      setDataMahasiswa(response.data);

      // Perbarui searchResult dengan hasil pencarian
      setSearchTerm(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hendleGetMahasiswa();
  }, []);

  return (
    <Box
      width={"100%"}
      display="flex"
      justifyContent="center"
      flexDirection={"column"}
      p={"50px"}
      bg={"#DCFFB7"}
    >
      <Box
        maxW="100%"
        bg={"white"}
        p={"50px"}
        borderRadius={"10px"}
        display={"flex"}
      >
        <Box w={"50%"} mr={"10px"}>
          <Text
            fontSize={"20px"}
            fontWeight={"bold"}
            mb={"20px"}
            textAlign={"center"}
          >
            TAMBAH MAHASISWA
          </Text>
          <FormControl mb={"20px"}>
            <FormLabel>NAME</FormLabel>
            <Input
              placeholder="name"
              borderColor={"black"}
              value={newMahasiswa.name}
              onChange={(e) =>
                setNewMahasiswa({ ...newMahasiswa, name: e.target.value })
              }
            ></Input>
          </FormControl>
          <FormControl mb={"20px"}>
            <FormLabel>TANGGAL LAHIR</FormLabel>
            <Input
              placeholder="Tanggal Lahir"
              borderColor={"black"}
              value={newMahasiswa.tanggal_lahir}
              onChange={(e) =>
                setNewMahasiswa({
                  ...newMahasiswa,
                  tanggal_lahir: e.target.value,
                })
              }
            ></Input>
          </FormControl>
          <FormControl mb={"20px"}>
            <FormLabel>ALAMAT</FormLabel>
            <Input
              placeholder="Alamat"
              borderColor={"black"}
              value={newMahasiswa.alamat}
              onChange={(e) =>
                setNewMahasiswa({ ...newMahasiswa, alamat: e.target.value })
              }
            ></Input>
          </FormControl>
          {editMahasiswa === null ? (
            <Button
              mt={"10px"}
              color={"white"}
              backgroundColor={"green"}
              _hover={{ backgroundColor: "green.600" }}
              onClick={handleCreateMahasiswa}
            >
              TAMBAH
            </Button>
          ) : (
            <Button
              mt={"10px"}
              color={"white"}
              backgroundColor={"#65B741"}
              _hover={{ backgroundColor: "green.600" }}
              onClick={handleClickEditMahasiswa}
            >
              SIMPAN
            </Button>
          )}
        </Box>
        <Box w={"50%"} display={"flex"} justifyContent={"end"}>
          <Image
            borderRadius={"20px"}
            src="https://inovasicom.files.wordpress.com/2013/10/mounza-logo.png"
          ></Image>
        </Box>
      </Box>
      <Box mt={"50px"} bg={"white"} p={"50px"} borderRadius={"20px"}>
        <FormControl>
          <FormLabel>CARI MAHASISWA</FormLabel>
          <InputGroup>
            <Input
              borderColor={"black"}
              w={"50%"}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari..."
            ></Input>
            <InputRightElement w={"105%"} pointerEvents="none">
              <CiSearch color="gray.300" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          borderColor={"black"}
          bg={"green"}
          color={"white"}
          mt={"20px"}
          _hover={{ backgroundColor: "green.600" }}
          onClick={() => handleSerachMahasiswa(searchTerm)}
        >
          Cari
        </Button>
      </Box>
      <Box mt={"50px"}>
        <Text
          mb={"20px"}
          fontSize={"15px"}
          fontWeight={"bold"}
        >
          LIST MAHASISWA
        </Text>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th borderColor={"black"}>NAME</Th>
                <Th borderColor={"black"}>TANGGAL LAHIR</Th>
                <Th borderColor={"black"}>ALAMAT</Th>
                <Th borderColor={"black"}>AKSI</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataMahasiswa.length === 0 ? (
                <Tr>
                  <Td>DATA TIDAK ADA</Td>
                </Tr>
              ) : (
                dataMahasiswa.map((mahasiswa) => (
                  <Tr borderColor={"black"} key={mahasiswa.id}>
                    <Td borderColor={"black"}>{mahasiswa.name}</Td>
                    <Td borderColor={"black"}>{mahasiswa.tanggal_lahir}</Td>
                    <Td borderColor={"black"}>{mahasiswa.alamat}</Td>
                    <Td borderColor={"black"}>
                      {editMahasiswa === mahasiswa.id ? (
                        <Button
                          bg={"#65B741"}
                          color={"white"}
                          _hover={{ backgroundColor: "green.600" }}
                          onClick={handleClickEditMahasiswa}
                          display={"none"}
                        >
                          SIMPAN
                        </Button>
                      ) : (
                        <>
                          <Button
                            bg={"green"}
                            color={"white"}
                            mr={"10px"}
                            _hover={{ backgroundColor: "green.600" }}
                            onClick={() => handDataEditMahasiswa(mahasiswa)}
                          >
                            EDIT
                          </Button>
                          <Button
                            onClick={() => handleDeleteMahasiswa(mahasiswa.id)}
                            bg={"red"}
                            color={"white"}
                            _hover={{ backgroundColor: "red.600" }}
                          >
                            DELETE
                          </Button>
                        </>
                      )}
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
