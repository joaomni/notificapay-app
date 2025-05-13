import React, { useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import notifee, { AndroidImportance } from "@notifee/react-native";

async function createChannel(id: string, name: string) {
  return await notifee.createChannel({
    id,
    name,
    importance: AndroidImportance.HIGH,
  });
}

async function showNotificationA() {
  const channelId = await createChannel("kirvano", "Notificações Kirvano");
  await notifee.displayNotification({
    title: "Venda aprovada!",
    body: "Sua comissão: R$ 147,00",
    android: {
      channelId,
      smallIcon: "ic_kirvano",
      largeIcon: "ic_kirvano",
      pressAction: {
        id: "default",
      },
    }
  });
}

async function showNotificationB() {
  const channelId = await createChannel("kiwify", "Notificações Kiwify");
  await notifee.displayNotification({
    title: "Venda aprovada!",
    body: "Sua comissão: R$ 77,68",
    android: {
      channelId,
      smallIcon: "ic_kiwify",
      largeIcon: "ic_kiwify",
    }
  });
}

export default function NotificationButtons() {
  useEffect(() => {
    // Solicitar permissão de notificações
    async function requestPermission() {
      const permission = await notifee.requestPermission();
      if (permission) {
        console.log("Permissões concedidas");
      } else {
        console.log("Permissões negadas");
      }
    }

    requestPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Notificação A" onPress={showNotificationA} />
      <View style={{ height: 20 }} />
      <Button title="Notificação B" onPress={showNotificationB} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
});
