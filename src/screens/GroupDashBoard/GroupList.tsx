import React, { FC, useEffect, useState, useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  VirtualizedList,
  LogBox,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { selectToken } from "../../store/reducers/AuthSlice";
import {
  selectDashboardGroups,
  getDashboardGroups,
} from "../../store/reducers/GroupSlice";
import GroupItem from "./GroupItem";
import { Status } from "../../types/status";
import { ActivityIndicator, Text } from "react-native-paper";
import { authAPI } from "../../apis/axios/auth";
enum Role {
  admin = "admin",
  user = "user",
}

export interface DashboardGroup {
  id: string;
  name: string;
  description: string;
  numbersOfMember: number;
  role: Role;
  avatars: {
    avatar: string;
    name: string;
  }[];
  checkedIn: number;
}
export interface DashboardGroupsData {
  currentPage: number;
  totalPage: number;
  totalGroups: number;
  groups: DashboardGroup[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
  },
});

const GroupList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [groups, setGroups] = useState<DashboardGroup[]>([
    {
      id: "6150b5c637cef39b11366cbf",
      name: "PFIEV",
      description: "PFIEV3 company",
      numbersOfMember: 9,
      role: Role.admin,
      avatars: [
        {
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/daktht.appspot.com/o/Users%2F614aec646ce33eb1f0f0d5f4%2Favatar?alt=media&token=b3d23162-1431-4d88-992b-8d1494164ca4",
          name: "Nguyen Thanh Long",
        },
        {
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/daktht.appspot.com/o/Users%2F614aec646ce33eb1f0f0d5f5%2Favatar?alt=media&token=1bab911a-fe61-4139-8afd-aec3fc09e9c7",
          name: "Ngo Cong Long",
        },
        {
          avatar: "",
          name: "Duong Van Bao",
        },
        {
          avatar: "",
          name: "Nguyen Dinh Man",
        },
        {
          avatar: "",
          name: "Tran The Nam",
        },
        {
          avatar: "",
          name: "Bui Anh Tuan",
        },
        {
          avatar: "",
          name: "Nguyen Thi Phuong Thao",
        },
        {
          avatar: "",
          name: "Do Van Duc Thanh",
        },
        {
          avatar: "",
          name: "Qui Anh Khoa",
        },
      ],
      checkedIn: 0,
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const fetchGroups = useCallback(() => {
    return async (page: number): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await authAPI(String(token)).get("/groups", {
          params: {
            page: page,
          },
        });

        setGroups((prev) => {
          if (page === 1) {
            return data?.groups;
          }
          return [...prev, ...data?.groups];
        });
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
  }, [token]);

  useEffect(() => {
    fetchGroups()(currentPage);
  }, [fetchGroups, currentPage]);

  const renderItem: ListRenderItem<DashboardGroup> = ({ item }) => (
    <GroupItem {...item} />
  );

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchGroups()(1);
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  }, [fetchGroups]);

  const loadMoreContent = async () => {
    console.log("........");
    try {
      const { data } = await authAPI(String(token)).get("/groups", {
        params: {
          page: currentPage + 1,
        },
      });

      setGroups((prev) => {
        return [...prev, ...data?.groups];
      });
    } catch (e) {
    } finally {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading || refreshing) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScrollEndDrag={loadMoreContent}
      >
        <FlatList
          data={groups}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // onEndReached={loadMoreContent}
          // onScrollBeginDrag={loadMoreContent}
          initialNumToRender={4}
          // onScroll={loadMoreContent}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupList;
