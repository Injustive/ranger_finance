from utils.router import MainRouter, DbRouter


class RangerFinanceRouter(MainRouter, DbRouter):
    def get_choices(self):
        return ['Swap n times']

    def route(self, task, action):
        return dict(zip(self.get_choices(), [task.swap_n_times]))[action]

    @property
    def action(self):
        self.start_db_router()
        return self.get_action()
