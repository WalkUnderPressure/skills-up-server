const MockNotificationData = {
    userId: '1',
    title: 'Your account created!',
    description: '',
    href: '',
    createdAt: 1724548384024,
}

const MockNotificationDataTwo = {
    ...MockNotificationData,
    createdAt: 1724548388024,
}

module.exports = [MockNotificationData, MockNotificationDataTwo];
