import { Box, Center, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

type TypeMahasiswaProps = {
  name: string;
  tanggal_lahir: string;
  alamat: string;
  id: number;
};

export default function Home() {
  const [dataMahasiswa, setDataMahasiswa] = useState<TypeMahasiswaProps[]>([]);

  const handleGetDataMahasiswa = async () => {
    try {
      const response = await axios.get(
        "https://65955e5804335332df829205.mockapi.io/api-nashta/v1/mahasiswa"
      );
      setDataMahasiswa(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetDataMahasiswa();
  }, []);

  return (
    <Box bg={"#DCFFB7"} h={"100vh"}>
      <Center
        h={"full"}
      >
        <Box
          bg={"white"}
          textAlign="center"
          maxW="1200px"
          mx="auto"
          p="6"
          borderRadius="md"
          boxShadow="lg"
        >
          <Heading as="h1" size="xl" mb="4">
            Selamat Datang di Dashboard Admin Penerimaan Mahasiswa Baru!
          </Heading>
          <Text fontSize="lg" mb="6">
            Admin area ini memberikan Anda akses penuh untuk mengelola data
            penerimaan mahasiswa baru. Dengan berbagai fitur dan fungsionalitas
            yang disediakan, Anda dapat dengan mudah mengelola pendaftaran,
            melihat status mahasiswa, dan melakukan pembaruan data.
          </Text>
          <Text fontSize="lg" mb="6">
            Kami berkomitmen untuk menyediakan pengalaman administratif yang
            efisien dan intuitif. Gunakan dashboard ini untuk melacak proses
            penerimaan dan mendukung kelancaran operasional perguruan tinggi.
          </Text>
          <Box>
            <Text fontWeight={"bold"} display={"flex"}>
              BANYAK DATA MAHASISWA YANG SUDAH DAFTAR :{" "}
              <Text ml={"20px"} color={"green"}>
                {dataMahasiswa?.length}
              </Text>
            </Text>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}
