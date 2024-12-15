import { useState, useEffect } from "react";
import "./App.css";
import EmailItem from "./components/emailItem";
import EmailListsButtons from "./components/emailListsButtons";
import EmailBody from "./components/emailBody";
import FilterPageButton from "./components/filerPageButtons";
import {
  getLocalStorageReadEmailData,
  setLocalStorageEmailData,
} from "./utils";
import Loader from "./components/loader";

function App() {
  const [isItemCLicked, setIsItemCLicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedEmailData, setClickedEmailData] = useState({});
  const [emailData, setEmailData] = useState(undefined);
  const [filter, setFilter] = useState("unread");
  const [filterData, setFilterData] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const fetchEmailDataByEmailID = async (emailIdNo) => {
    if (emailIdNo?.id) {
      setIsLoading(true);
      const response = await fetch(
        `https://flipkart-email-mock.now.sh/?id=${emailIdNo?.id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setIsLoading(false);
      const result = await response.json();
      console.log({ result });
      setEmailData(result);
    }
  };

  const onEMailItemCLicked = (seletedItem) => {
    setIsItemCLicked((prev) => {
      if (prev && filter === "unread") {
        const updatedFilterData = filterData.filter(
          (emailData) => emailData.id != seletedItem.id
        );
        setFilterData(updatedFilterData);
      } else {
        if (filter === "unread") {
          let prevReadEmail = getLocalStorageReadEmailData();
          let setOfPrevEmaildData = prevReadEmail.length
            ? new Set(prevReadEmail.map((item) => item.id))
            : new Set();
          if (prevReadEmail.length && setOfPrevEmaildData.has(seletedItem.id)) {
            prevReadEmail = prevReadEmail.map((item) =>
              item.id === seletedItem.id
                ? { ...seletedItem, isRead: true }
                : item
            );
          } else {
            prevReadEmail.push(seletedItem);
          }

          setLocalStorageEmailData(prevReadEmail);
        }
        setClickedEmailData(seletedItem);
        fetchEmailDataByEmailID(seletedItem);
      }

      return !prev;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        //alert("start");
        //https://flipkart-email-mock.vercel.app/
        const response = await fetch(
          `https://flipkart-email-mock.now.sh/?page=${pageNo}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setIsLoading(false);
        //alert("response.ok");
        const result = await response.json();
        const list = result.list;
        //alert("list.len"+ list.length);
        const readData = getLocalStorageReadEmailData();
        let mofifiedList = list.map((data) => ({
          ...data,
          isRead: false,
          isFavrouite: false,
        }));
        let idsInArr = new Set();
        if (readData.length) {
          idsInArr = new Set(readData.map((item) => item.id));
        }
        //setData(mofifiedList.filter(item => !idsInArr.has(item.id))); // Store the fetched data in state
        setFilterData(mofifiedList.filter((item) => !idsInArr.has(item.id)));
        //alert("end")
      } catch (err) {
        // setError(err.message); // Handle errors
        console.log(err);
      }
    };

    if (filter === "read") {
      setFilterData(getLocalStorageReadEmailData());
    } else if (filter === "favorite") {
      const readData = getLocalStorageReadEmailData();
      console.log({ readData });
      setFilterData(
        readData.filter((emailData) => emailData.isFavrouite === true)
      );
    } else {
      fetchData();
    }
  }, [pageNo, filter]);

  const getFavorite = (seletedFavoriteId) => {
    const prevReadEmail = getLocalStorageReadEmailData();
    let setOfPrevEmaildData = prevReadEmail.length
      ? new Set(prevReadEmail.map((emailData) => emailData.id))
      : new Set();
    if (filter === "unread") {
      const prevApiFilterData = filterData;
      const markedFavorite = prevApiFilterData.map((emailData) =>
        emailData.id === seletedFavoriteId
          ? { ...emailData, isFavrouite: !emailData.isFavrouite }
          : emailData
      );
      if (!setOfPrevEmaildData.has(seletedFavoriteId)) {
        const favEmailObj = markedFavorite.find(
          (emailData) => emailData.id === seletedFavoriteId
        );
        prevReadEmail.push(favEmailObj);
        setLocalStorageEmailData(markedFavorite);
      }
      setFilterData(markedFavorite);
    }
    if (setOfPrevEmaildData.has(seletedFavoriteId)) {
      const markedFavorite = prevReadEmail.map((emailData) =>
        emailData.id === seletedFavoriteId
          ? { ...emailData, isFavrouite: !emailData.isFavrouite }
          : emailData
      );
      setLocalStorageEmailData(markedFavorite);
      if (filter === "read") {
        setFilterData(markedFavorite);
      } else if (filter === "favorite") {
        setFilterData(
          markedFavorite.filter((emailData) => emailData.isFavrouite === true)
        );
        setIsItemCLicked(false);
      }
    }

    setClickedEmailData({
      ...clickedEmailData,
      isFavrouite: !clickedEmailData.isFavrouite,
    });
  };

  const getFilter = (seletedFilter) => {
    //alert("getFilter "+ seletedFilter )
    setFilter(seletedFilter);
    setIsItemCLicked(false);
  };
  const getSeletedPage = (seletedPageNO) => {
    setPageNo(seletedPageNO);
  };

  return (
    <div className="App">
      <Loader isActive={isLoading} />
      <EmailListsButtons getFilter={getFilter} filter={filter} />
      {filter === "unread" ? (
        <FilterPageButton pageNo={pageNo} getSeletedPage={getSeletedPage} />
      ) : (
        <></>
      )}
      <div style={{ display: "flex" }}>
        <div style={{ width: `${isItemCLicked ? 30 : 100}%` }}>
          {filterData.map(
            ({ id, from, short_description, subject, date, isFavrouite }) => (
              <EmailItem
                key={id}
                id={id}
                from={from}
                short_description={short_description}
                subject={subject}
                date={date}
                isFavrouite={isFavrouite}
                onEMailItemCLicked={onEMailItemCLicked}
              />
            )
          )}
        </div>

        <div
          style={{
            display: `${isItemCLicked ? "inline" : "none"}`,
            width: "70%",
          }}
        >
          <EmailBody
            emailData={emailData}
            getFavorite={getFavorite}
            emailHeadder={clickedEmailData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
